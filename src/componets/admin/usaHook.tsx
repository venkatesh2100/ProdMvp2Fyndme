import { ChevronLeft, ChevronRight } from "lucide-react"; 

const stateSessions = [
  { state: "NY", value: 10 },
  { state: "CA", value: 20 },
];

const maxSessions = Math.max(...stateSessions.map((s) => s.value));

<div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
  {/* Country Selector */}
  <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
    <ChevronLeft size={16} />
    <span>United States</span>
  </div>

  {/* States Sessions */}
  <div className="space-y-4">
    {stateSessions.map(({ state, value }) => (
      <div key={state}>
        <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
          <div className="flex items-center gap-1">
            {state} <ChevronRight size={14} />
          </div>
          <span>{value}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
          <div
            className="h-2 bg-blue-400 rounded-full"
            style={{ width: `${(value / maxSessions) * 100}%` }}
          />
        </div>
      </div>
    ))}
  </div>
</div>
