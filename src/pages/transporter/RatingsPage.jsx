import DashboardLayout from "../../layouts/DashboardLayout";
import AdminRatingForm from "../../components/forms/AdminRatingForm";

const RatingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2A3663]">Transporter Ratings</h1>
          <p className="mt-2 text-gray-600">Share feedback on freight owners, loads, or completed jobs.</p>
        </div>

        <AdminRatingForm
          title="Transporter Rating"
          subtitle="Submit a rating for your recent freight activity or partner experience."
          submitLabel="Submit transporter rating"
        />
      </div>
    </DashboardLayout>
  );
};

export default RatingsPage;
