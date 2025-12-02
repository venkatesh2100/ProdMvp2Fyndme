// Chart Wrapper Component
export const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white shadow-md rounded-xl p-4">
    <h3 className="font-semibold mb-4">{title}</h3>
    {children}
  </div>
);
