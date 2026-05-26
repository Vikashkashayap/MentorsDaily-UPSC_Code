import { useTheme } from "../contexts/ThemeContext";

export default function DataTable({ 
  columns = [], 
  data = [], 
  maxHeight = "500px",
  emptyMessage = "No data available",
  showHeader = true,
  stickyHeader = false,
  headerClassName = "",
  rowClassName = ""
}) {
  const { isDark } = useTheme();

  if (!columns || columns.length === 0) {
    return (
      <div className="text-center py-8">
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          No columns defined
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-white'}`} style={{ maxHeight }}>
      <table className={`w-full ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        {showHeader && (
          <thead className={stickyHeader ? 'sticky top-0 z-10' : ''}>
            <tr className={`border-b ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'} ${headerClassName}`}>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className={`text-left py-3 px-4 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} ${column.headerClassName || ''}`}
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length} 
                className="text-center py-8"
              >
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {emptyMessage}
                </p>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={row.id || row._id || rowIndex} 
                className={`border-b ${isDark ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50' : 'border-gray-100 bg-white hover:bg-gray-50'} transition-colors ${rowClassName}`}
              >
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex}
                    className={`py-3 px-4 text-sm ${isDark ? 'text-gray-100' : 'text-gray-900'} ${column.cellClassName || ''}`}
                  >
                    {column.render ? column.render(row, rowIndex) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
