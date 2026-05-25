import { useEffect, useState } from 'react';
import { getAllPayments } from '../../api/coreService';
import { useTheme } from '../../contexts/ThemeContext';
import { messageHandler } from '../../utils/messageHandler';
import { formatDateTime } from '../../utils/dateUtils';
import DataTable from '../../components/DataTable';

export default function PaymentList() {
  const { isDark } = useTheme();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await getAllPayments();
        setPayments(response?.data?.data || []);
        setError(null);
        if (response?.data?.message) {
          messageHandler.success(response.data.message);
        }
      } catch (err) {
        const errorMsg = err?.response?.data?.message || 'Failed to load payments';
        setError(errorMsg);
        messageHandler.error(errorMsg);
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);



  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return isDark ? 'bg-green-900/30 text-green-300 border border-green-800/50' : 'bg-green-100 text-green-800';
      case 'FAILED':
        return isDark ? 'bg-red-900/30 text-red-300 border border-red-800/50' : 'bg-red-100 text-red-800';
      case 'PENDING':
        return isDark ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-800/50' : 'bg-yellow-100 text-yellow-800';
      default:
        return isDark ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? 'border-blue-400' : 'border-blue-600'}`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${isDark ? 'bg-red-900/20 border-red-800/50' : 'bg-red-50 border-red-200'} border rounded-md p-4`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className={`h-5 w-5 ${isDark ? 'text-red-400' : 'text-red-400'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium ${isDark ? 'text-red-300' : 'text-red-800'}`}>Error</h3>
            <div className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-700'}`}>{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border`}>
      <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Payment History</h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>View all payment transactions</p>
      </div>

      <DataTable
        columns={[
          {
            header: 'Student',
            accessor: 'studentName',
            render: (payment) => (
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                    {payment.studentName?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="ml-4">
                  <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {payment.studentName || 'N/A'}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {payment.email || 'N/A'}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {payment.mobile || 'N/A'}
                  </div>
                </div>
              </div>
            )
          },
          {
            header: 'Course',
            accessor: 'courseId',
            render: (payment) => payment.courseId?.title || 'N/A'
          },
          {
            header: 'Amount',
            accessor: 'amount',
            render: (payment) => (
              <div>
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ₹{payment.amount || 0}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {payment.currency || 'INR'}
                </div>
              </div>
            )
          },
          {
            header: 'Payment Method',
            accessor: 'paymentMethod',
            render: (payment) => (
              <div>
                <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {payment.paymentMethod || 'N/A'}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {payment.paymentGateway || 'N/A'}
                </div>
              </div>
            )
          },
          {
            header: 'Status',
            accessor: 'status',
            render: (payment) => (
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                {payment.status || 'N/A'}
              </span>
            )
          },
          {
            header: 'Date',
            accessor: 'paymentDate',
            render: (payment) => formatDateTime(payment.paymentDate || payment.createdAt)
          },
          {
            header: 'Order ID',
            accessor: 'orderId',
            render: (payment) => (
              <div>
                <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'} font-mono`}>
                  {payment.orderId || 'N/A'}
                </div>
                {payment.receiptNumber && (
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Receipt: {payment.receiptNumber}
                  </div>
                )}
              </div>
            )
          }
        ]}
        data={payments}
        maxHeight="600px"
        emptyMessage="No payment transactions have been recorded yet."
        stickyHeader={true}
      />

      {payments.length > 0 && (
        <div className={`px-6 py-3 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-t`}>
          <div className="flex items-center justify-between">
            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Showing <span className="font-medium">{payments.length}</span> payment(s)
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Total Revenue: <span className={`font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                ₹{payments.reduce((sum, payment) => sum + (payment.amount || 0), 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
