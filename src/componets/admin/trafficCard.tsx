"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Color palette - same as trafficReport.tsx
const COUNTRY_COLORS = [
  "#E1F5FE", "#FF6B9D", "#C5E1A5", "#0288D1", "#81D4FA", "#90A4AE", "#B3E5FC", "#4FC3F7", "#CFD8DC", "#0277BD",
  "#FF7043", "#BA68C8", "#9E9D24", "#F48FB1", "#80DEEA", "#8D6E63", "#9575CD", "#F06292", "#4DB6AC", "#FFD54F",
  "#0D47A1", "#B71C1C", "#C62828", "#F44336", "#FF5722", "#FF9800", "#FFC107", "#FFEB3B", "#FFD700", "#FFA500",
  "#5D4037", "#8D6E63", "#BCAAA4", "#827717", "#689F38", "#558B2F", "#33691E", "#1B5E20", "#212121", "#000000",
  "#546E7A", "#78909C", "#90A4AE", "#E1BEE7", "#558B2F", "#689F38", "#9CCC65", "#CDDC39", "#8D6E63", "#FFD54F",
  "#F9A825", "#B71C1C", "#E57373", "#FFAB91", "#F8BBD0", "#42A5F5", "#90CAF9", "#BBDEFB", "#64B5F6", "#FF6F00",
  "#FF8F00", "#FFB74D", "#FF8A65", "#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9", "#B39DDB", "#CE93D8", "#E1BEE7",
  "#9C27B0", "#7B1FA2", "#BA68C8", "#CE93D8", "#AB47BC", "#F06292", "#424242", "#757575", "#BDBDBD", "#9E9E9E",
  "#FF5252", "#FF4081", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688",
  "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B", "#9E9E9E",
];

const COUNTRIES = [
  "US", "Canada", "Japan", "Mexico", "Australia", "India", "China", "Germany", "UK", "Ethiopia",
  "Kenya", "South Africa", "Brazil", "Argentina", "France", "Italy", "Spain", "Russia", "South Korea", "Indonesia",
  "Turkey", "Saudi Arabia", "Poland", "Thailand", "Netherlands", "Belgium", "Sweden", "Switzerland", "Norway", "Denmark",
  "Finland", "Greece", "Portugal", "Czech Republic", "Romania", "Hungary", "Ireland", "New Zealand", "Singapore", "Malaysia",
  "Philippines", "Vietnam", "Bangladesh", "Pakistan", "Egypt", "Nigeria", "Ghana", "Morocco", "Algeria", "Tunisia",
  "Ukraine", "Belarus", "Kazakhstan", "Uzbekistan", "Azerbaijan", "Georgia", "Armenia", "Israel", "United Arab Emirates", "Qatar",
  "Kuwait", "Oman", "Jordan", "Lebanon", "Iraq", "Iran", "Afghanistan", "Nepal", "Sri Lanka", "Myanmar",
  "Cambodia", "Laos", "Mongolia", "North Korea", "Taiwan", "Hong Kong", "Macau", "Chile", "Peru", "Colombia",
  "Venezuela", "Ecuador", "Uruguay", "Paraguay", "Bolivia", "Cuba", "Jamaica", "Haiti", "Dominican Republic", "Costa Rica",
  "Panama", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Belize", "Trinidad and Tobago", "Barbados", "Bahamas", "Iceland",
];

interface TrafficData {
  country: string;
  value: number;
}


export const TrafficBarChart = ({ data }: { data: TrafficData[] }) => {
  if (!data || data.length === 0) {
    return <div className="text-sm text-gray-500">No traffic data available</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={data} barSize={28}>
          <XAxis
            dataKey="country"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#1e293b", fontSize: 12 }}
          />
          <Tooltip  />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => {
              const colorIndex = COUNTRIES.indexOf(entry.country);
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COUNTRY_COLORS[colorIndex >= 0 ? colorIndex % COUNTRY_COLORS.length : index % COUNTRY_COLORS.length]}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
