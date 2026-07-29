const DashboardGrid = ({ children, columns = 4 }) => {
  const columnClasses = {
    4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-5",
  };

  return (
    <div className={`grid ${columnClasses[columns] || columnClasses[4]} gap-6`}>
      {children}
    </div>
  );
};

export default DashboardGrid;
