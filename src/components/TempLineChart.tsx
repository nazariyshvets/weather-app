'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface TempPoint {
  time: string;
  temp: number;
}

interface TempLineChartProps {
  data: TempPoint[];
}

export const TempLineChart = ({ data }: TempLineChartProps) => {
  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} unit="°C" width={40} />
          <RTooltip formatter={(v) => [`${Math.round(Number(v))}°C`, 'Temp']} />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#1677ff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
