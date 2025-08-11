import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const BarChart = ({ 
  data, 
  xKey = 'name',
  yKey = 'value',
  color = '#10B981',
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  yAxisLabel = '',
  xAxisLabel = ''
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p className="text-slate-500 text-sm">Sem dados para exibir</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="text-slate-800 font-medium">{label}</p>
          <p className="text-slate-600">
            {data.value.toFixed(1)} {data.payload.unit || ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          )}
          <XAxis 
            dataKey={xKey}
            tick={{ fontSize: 12, fill: '#64748B' }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickLine={{ stroke: '#E2E8F0' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748B' }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickLine={{ stroke: '#E2E8F0' }}
            label={{ 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#64748B', fontSize: '12px' }
            }}
          />
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && <Legend />}
          <Bar 
            dataKey={yKey} 
            fill={color}
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
      {xAxisLabel && (
        <div className="text-center mt-2">
          <p className="text-sm text-slate-600">{xAxisLabel}</p>
        </div>
      )}
    </div>
  );
};

export default BarChart;

