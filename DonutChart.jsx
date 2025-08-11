import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DonutChart = ({ 
  data, 
  colors = ['#3B82F6', '#F97316', '#10B981', '#9333EA'], 
  size = 200,
  innerRadius = 60,
  outerRadius = 90,
  showLegend = true,
  showTooltip = true,
  centerText = null
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <p className="text-slate-500 text-sm">Sem dados</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="text-slate-800 font-medium">{data.name}</p>
          <p className="text-slate-600">
            {data.value.toFixed(1)} {data.payload.unit || ''}
          </p>
          <p className="text-slate-500 text-sm">
            {((data.value / data.payload.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-slate-600">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && <Legend content={<CustomLegend />} />}
        </PieChart>
      </ResponsiveContainer>
      
      {centerText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            {typeof centerText === 'string' ? (
              <p className="text-slate-800 font-semibold">{centerText}</p>
            ) : (
              centerText
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonutChart;

