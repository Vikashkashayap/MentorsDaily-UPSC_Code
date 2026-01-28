import { useTheme } from "../../contexts/ThemeContext";
import PaymentList from "./PaymentList";

export default function AdminPayments() {
  const { isDark } = useTheme();

  return (
    <div className="w-full">
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-16 z-10 backdrop-blur-sm`}>
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Payments Management</h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>View and manage all payment transactions</p>
            </div>
            
            {/* Filter Options */}
            <div className="flex items-center gap-3">
              <select 
                className={`text-sm font-medium px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none cursor-pointer`}
                defaultValue="all"
              >
                <option value="all">All Payments</option>
                <option value="success">Successful</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <PaymentList />
      </div>
    </div>
  );
}