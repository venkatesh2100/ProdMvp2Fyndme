// Stat Card Component
export const StatCard = ({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) => {
  const isPositive = change.includes("+");

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="flex justify-between items-end mt-2">
        <span className="text-2xl font-bold">{value}</span>
        <span
          className={`${
            isPositive ? "text-green-500" : "text-red-500"
          } font-medium`}
        >
          <div className="flex">
            {change}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>
          </div>
        </span>
      </div>
    </div>
  );
};
