import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

export default function MonthlyGrowthChart({ data }) {
  const { isDark } = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} p-4 rounded-lg shadow-xl border`}>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-2`}>
            {payload[0].payload.fullDate}
          </p>
          <div className="space-y-1">
            <p className="text-purple-500 font-semibold">
              New Students: {payload[0].value}
            </p>
            <p className="text-blue-500 font-semibold">
              Total: {payload[1].value}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-purple-50 border-purple-100'} rounded-2xl shadow-xl p-6 border-2 hover:shadow-2xl transition-all duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
            📊 Monthly Growth Analysis
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            New vs Total students comparison
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
          <span className={`text-sm font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            Last 3 Months
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorNewStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#9333ea" stopOpacity={0.7}/>
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
          <Bar 
            dataKey="newStudents" 
            fill="url(#colorNewStudents)"
            radius={[10, 10, 0, 0]}
            name="New Students"
            maxBarSize={50}
          />
          <Line 
            type="monotone" 
            dataKey="totalStudents" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7 }}
            name="Total Students"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
