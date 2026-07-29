import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#FAF6E3]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;
