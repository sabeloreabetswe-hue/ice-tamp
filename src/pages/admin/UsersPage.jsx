import DashboardLayout from "../../layouts/DashboardLayout";
import UserManagement from "./UserManagement";

const UsersPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2A3663]">Users</h1>
          <p className="mt-2 text-gray-600">Manage and review platform users from this section.</p>
        </div>

        <UserManagement />
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
