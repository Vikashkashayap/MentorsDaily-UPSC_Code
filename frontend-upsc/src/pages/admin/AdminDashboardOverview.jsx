import { useEffect, useState } from "react";
import { getUserData } from "../../utils/userData";
import { getUsers, getAllPayments } from "../../api/coreService";
import { useTheme } from "../../contexts/ThemeContext";
import { isUserAdmin, isUserSuperAdmin } from "../../utils/authUtils";
import { messageHandler } from "../../utils/messageHandler";
import RegisteredStudentsChart from "../../components/charts/RegisteredStudentsChart";
import RevenueChart from "../../components/charts/RevenueChart";
import PaymentsChart from "../../components/charts/PaymentsChart";
import MonthlyGrowthChart from "../../components/charts/MonthlyGrowthChart";
import DataTable from "../../components/DataTable";

export default function AdminDashboardOverview() {
  const userData = getUserData();
  const { isDark } = useTheme();
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    students: [],
    revenue: [],
    payments: [],
    growth: []
  });

  const isAdmin = isUserAdmin();
  const isSuperAdmin = isUserSuperAdmin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!isAdmin) {
          const errorMsg = "Access denied. Admin permissions required.";
          setError(errorMsg);
          messageHandler.error(errorMsg);
          setLoading(false);
          return;
        }

        // Fetch users (only for super_admin)
        if (isSuperAdmin) {
          try {
            const usersResponse = await getUsers();
            const usersArr = usersResponse?.data?.data || [];
            setUsers(usersArr);
          } catch (userErr) {
            console.warn("Could not fetch users:", userErr);
            setUsers([]);
          }
        }

        // Fetch payments
        try {
          const paymentsResponse = await getAllPayments();
          const paymentsArr = paymentsResponse?.data?.data || [];
          setPayments(paymentsArr);
        } catch (paymentErr) {
          console.warn("Could not fetch payments:", paymentErr);
          setPayments([]);
        }

        setError(null);
        // Don't show success message for routine data loading
      } catch (err) {
        const errorMsg = err?.response?.data?.message || "Failed to load dashboard data";
        setError(errorMsg);
        messageHandler.error(errorMsg);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAdmin, isSuperAdmin]);

  // Generate chart data for last 90 days (month-wise)
  useEffect(() => {
    if (users.length === 0 && payments.length === 0) return;

    const today = new Date();
    const monthsData = [];

    // Get last 3 months data
    for (let i = 2; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      monthsData.push({
        date: date,
        month: date.toLocaleDateString('en-IN', { month: 'short' }),
        fullDate: date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
        year: date.getFullYear(),
        monthNum: date.getMonth()
      });
    }

    // Students chart data - cumulative count
    const studentsData = monthsData.map(monthInfo => {
      const cumulativeStudents = users.filter(user => {
        const userDate = new Date(user.createdAt);
        return userDate <= new Date(monthInfo.year, monthInfo.monthNum + 1, 0);
      }).length;

      return {
        month: monthInfo.month,
        fullDate: monthInfo.fullDate,
        students: cumulativeStudents
      };
    });

    // Revenue chart data - monthly sum
    const revenueData = monthsData.map(monthInfo => {
      const monthRevenue = payments
        .filter(payment => {
          const paymentDate = new Date(payment.paymentDate || payment.createdAt);
          return paymentDate.getMonth() === monthInfo.monthNum &&
            paymentDate.getFullYear() === monthInfo.year &&
            payment.status === 'SUCCESS';
        })
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);

      return {
        month: monthInfo.month,
        fullDate: monthInfo.fullDate,
        revenue: monthRevenue
      };
    });

    // Payments chart data - monthly count
    const paymentsData = monthsData.map(monthInfo => {
      const monthPayments = payments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate || payment.createdAt);
        return paymentDate.getMonth() === monthInfo.monthNum &&
          paymentDate.getFullYear() === monthInfo.year &&
          payment.status === 'SUCCESS';
      }).length;

      return {
        month: monthInfo.month,
        fullDate: monthInfo.fullDate,
        payments: monthPayments
      };
    });

    // Growth chart data - new students per month
    const growthData = monthsData.map((monthInfo, index) => {
      const monthStart = new Date(monthInfo.year, monthInfo.monthNum, 1);
      const monthEnd = new Date(monthInfo.year, monthInfo.monthNum + 1, 0);

      const newStudents = users.filter(user => {
        const userDate = new Date(user.createdAt);
        return userDate >= monthStart && userDate <= monthEnd;
      }).length;

      const totalStudents = users.filter(user => {
        const userDate = new Date(user.createdAt);
        return userDate <= monthEnd;
      }).length;

      return {
        month: monthInfo.month,
        fullDate: monthInfo.fullDate,
        newStudents: newStudents,
        totalStudents: totalStudents
      };
    });

    setChartData({
      students: studentsData,
      revenue: revenueData,
      payments: paymentsData,
      growth: growthData
    });
  }, [users, payments]);

  // Filter sensitive data based on user permissions
  const filteredUsers = isSuperAdmin ? users : users.filter(u =>
    u.role !== "super_admin" && u._id !== userData?._id
  );

  const totalUsers = filteredUsers.length;
  const adminUsers = filteredUsers.filter(
    (u) => u.role === "admin" || u.role === "super_admin"
  ).length;

  // Calculate payment statistics
  const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const successfulPayments = payments.filter(payment => payment.status === 'SUCCESS');
  const totalPaidStudents = successfulPayments.length;

  // Calculate today's payments
  const today = new Date().toDateString();
  const todayPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.paymentDate || payment.createdAt).toDateString();
    return paymentDate === today && payment.status === 'SUCCESS';
  });

  const todayRevenue = todayPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const todayPaymentCount = todayPayments.length;

  // Format revenue for display
  const formatRevenue = (amount) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
          <div className="px-6 py-4">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
          <div className="px-6 py-4">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
            <p className="text-red-600 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with Date Range Picker */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-16 z-10 backdrop-blur-sm`}>
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Welcome back, {userData?.name || 'Admin'}!</p>
            </div>

            {/* Date Range Picker */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
                <svg className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <select
                  className={`text-sm font-medium ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} border-none focus:outline-none cursor-pointer`}
                  defaultValue="90"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="180">Last 6 Months</option>
                  <option value="365">Last Year</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Users - Only show to super_admin */}
          {isSuperAdmin && (
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Users</p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalUsers}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Registered users</p>
                </div>
                <div className={`p-3 ${isDark ? 'bg-blue-900/50' : 'bg-blue-100'} rounded-full`}>
                  <svg className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-1.306-.835-2.418-2-2.83M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-1.306.835-2.418 2-2.83m0 0a3 3 0 013.83 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Active Tests */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Active Tests</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>156</p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Currently active</p>
              </div>
              <div className={`p-3 ${isDark ? 'bg-green-900/50' : 'bg-green-100'} rounded-full`}>
                <svg className={`h-8 w-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Questions Added</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>2,847</p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Total questions</p>
              </div>
              <div className={`p-3 ${isDark ? 'bg-purple-900/50' : 'bg-purple-100'} rounded-full`}>
                <svg className={`h-8 w-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Paid Students</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalPaidStudents}</p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Active subscribers</p>
              </div>
              <div className={`p-3 ${isDark ? 'bg-orange-900/50' : 'bg-orange-100'} rounded-full`}>
                <svg className={`h-8 w-8 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Stats */}
        {isAdmin && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Today's Revenue */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl shadow-lg p-6 border border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-1">Today's Revenue</p>
                  <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-300">{formatRevenue(todayRevenue)}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">Successful payments today</p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                  <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Today's Payments */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Today's Payments</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-300">{todayPaymentCount}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">Successful transactions</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                  <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-400 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-300">{formatRevenue(totalRevenue)}</p>
                  <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">All-time earnings</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-800 rounded-full">
                  <svg className="h-8 w-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <RegisteredStudentsChart data={chartData.students} />
          <RevenueChart data={chartData.revenue} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <PaymentsChart data={chartData.payments} />
          <MonthlyGrowthChart data={chartData.growth} />
        </div>

        {/* Recent Registered Students */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg p-6 border`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              👥 Recent Registered Students
            </h3>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Last 10 registrations
            </span>
          </div>

          <DataTable
            columns={[
              {
                header: 'Name',
                accessor: 'name',
                render: (row) => (
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-blue-900/50' : 'bg-blue-100'} flex items-center justify-center`}>
                      <span className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        {row.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium">{row.name}</span>
                  </div>
                )
              },
              { header: 'Email', accessor: 'email' },
              { header: 'Phone', accessor: 'phone' },
              { header: 'Registered', accessor: 'time' },
              {
                header: 'Status',
                accessor: 'status',
                render: (row) => (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'}`}>
                    {row.status}
                  </span>
                )
              }
            ]}
            data={[
              { name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43210', time: '5 min ago', status: 'Active' },
              { name: 'Rahul Kumar', email: 'rahul.k@email.com', phone: '+91 98765 43211', time: '15 min ago', status: 'Active' },
              { name: 'Anjali Verma', email: 'anjali.v@email.com', phone: '+91 98765 43212', time: '1 hour ago', status: 'Active' },
              { name: 'Vikram Singh', email: 'vikram.s@email.com', phone: '+91 98765 43213', time: '2 hours ago', status: 'Active' },
              { name: 'Sneha Patel', email: 'sneha.p@email.com', phone: '+91 98765 43214', time: '3 hours ago', status: 'Active' },
              { name: 'Arjun Reddy', email: 'arjun.r@email.com', phone: '+91 98765 43215', time: '5 hours ago', status: 'Active' },
              { name: 'Pooja Gupta', email: 'pooja.g@email.com', phone: '+91 98765 43216', time: '6 hours ago', status: 'Active' },
              { name: 'Karan Mehta', email: 'karan.m@email.com', phone: '+91 98765 43217', time: '8 hours ago', status: 'Active' },
              { name: 'Divya Joshi', email: 'divya.j@email.com', phone: '+91 98765 43218', time: '10 hours ago', status: 'Active' },
              { name: 'Rohit Sharma', email: 'rohit.sh@email.com', phone: '+91 98765 43219', time: '12 hours ago', status: 'Active' },
            ]}
            maxHeight="500px"
            emptyMessage="No recent registrations"
          />
        </div>
      </div>
    </div>
  );
}