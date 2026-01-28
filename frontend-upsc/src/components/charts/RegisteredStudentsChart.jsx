import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

export default function RegisteredStudentsChart({ data }) {
  const { isDark } = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} p-3 rounded-lg shadow-xl border`}>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-1`}>
            {payload[0].payload.fullDate}
          </p>
          <p className="text-blue-500 font-bold text-lg">
            {payload[0].value} Students
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-blue-50 border-blue-100'} rounded-2xl shadow-xl p-6 border-2 hover:shadow-2xl transition-all duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
            📈 Student Registrations
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Monthly growth trend
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
          <span className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            Last 90 Days
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="students" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, strokeWidth: 2 }}
            name="Total Students"
            fill="url(#colorStudents)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
