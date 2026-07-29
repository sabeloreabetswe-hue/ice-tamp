import DashboardLayout from "../../layouts/DashboardLayout";
import AdminRatingForm from "../../components/forms/AdminRatingForm";

const RatingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2A3663]">Admin Ratings</h1>
          <p className="mt-2 text-gray-600">Submit or review ratings for freight activity and partner performance.</p>
        </div>

        <AdminRatingForm
          title="Admin Rating"
          subtitle="Record feedback for recent freight activity, partner performance, or completed jobs."
          submitLabel="Submit admin rating"
        />
      </div>
    </DashboardLayout>
  );
};

export default RatingsPage;
