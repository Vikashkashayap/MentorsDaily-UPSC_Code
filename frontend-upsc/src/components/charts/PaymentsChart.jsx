import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

export default function PaymentsChart({ data }) {
  const { isDark } = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} p-3 rounded-lg shadow-xl border`}>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-1`}>
            {payload[0].payload.fullDate}
          </p>
          <p className="text-orange-500 font-bold text-lg">
            {payload[0].value} Payments
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-orange-50 border-orange-100'} rounded-2xl shadow-xl p-6 border-2 hover:shadow-2xl transition-all duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
            💳 Payment Transactions
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Successful payment trends
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full ${isDark ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
          <span className={`text-sm font-semibold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
            Last 90 Days
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPayments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} strokeOpacity={0.5} />
          <XAxis 
            dataKey="month" 
            stroke={isDark ? '#9ca3af' : '#6b7280'}
            style={{ fontSize: '13px', fontWeight: '500' }}
            tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
          />
          <YAxis 
            stroke={isDark ? '#9ca3af' : '#6b7280'}
            style={{ fontSize: '13px', fontWeight: '500' }}
            tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />
          <Area 
            type="monotone" 
            dataKey="payments" 
            stroke="#f59e0b" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPayments)"
            name="Successful Payments"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
