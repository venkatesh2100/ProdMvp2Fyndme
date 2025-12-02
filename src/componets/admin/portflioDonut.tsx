"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#1E3A8A', '#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA',
  '#93C5FD', '#BFDBFE', '#DBEAFE', '#EFF6FF'
];

export const PortfolioDonutChart = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  if (!data || data.length === 0) return <div>No portfolio data</div>;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">User Create Portfolio Types</h3>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center">
        <ul className="text-sm text-gray-700 space-y-2 md:mr-6">
          {data.map((item, index) => (
            <li key={item.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {item.name}
              <span className="ml-auto text-gray-400 hidden md:inline">• Users</span>
            </li>
          ))}
        </ul>

        <div className="relative w-60 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{total.toLocaleString()}</span>
            <span className="text-sm text-gray-500">Total Portfolio Users</span>
          </div>
        </div>
      </div>
    </div>
  );
};
