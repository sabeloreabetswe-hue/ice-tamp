import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RequireAuth from "../components/RequireAuth";

import FreightOwnerDashboard from "../pages/freight-owner/Dashboard";
import TransporterDashboard from "../pages/transporter/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import UsersPage from "../pages/admin/UsersPage";
import AuditLog from "../pages/admin/AuditLog";
import DisputeManagement from "../pages/admin/DisputeManagement";
import RatingsPage from "../pages/admin/RatingsPage";
import SettingsPage from "../pages/admin/SettingsPage";
import LoadRequests from "../pages/freight-owner/LoadRequest";
import CreateLoad from "../pages/freight-owner/CreateLoad";
import ViewLoads from "../pages/freight-owner/ViewLoads";
import EditLoad from "../pages/freight-owner/EditLoad";
import ViewShipments from "../pages/freight-owner/ViewShipments";
import FreightOwnerTrackingPage from "../pages/freight-owner/Tracking";
import FreightOwnerRatings from "../pages/freight-owner/Ratings";
import RecommendedMatches from "../pages/freight-owner/RecommendedMatches";
import MatchRequestsPage from "../pages/freight-owner/MatchRequests";
import RegisterTruck from "../pages/transporter/RegisterTruck";
import ViewTrucks from "../pages/transporter/ViewTrucks";
import EditTruck from "../pages/transporter/EditTruck";
import BrowseLoads from "../pages/transporter/BrowseLoads";
import MyRequests from "../pages/transporter/MyRequests";
import MyShipments from "../pages/transporter/MyShipments";
import Ratings from "../pages/transporter/Ratings";

import { ROUTES } from "../constants/routes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public authentication pages */}
      <Route path={ROUTES.auth.root} element={<Login />} />
      <Route path={ROUTES.auth.login} element={<Login />} />
      <Route path={ROUTES.auth.register} element={<Register />} />

      {/* Freight owner protected routes */}
      <Route element={<RequireAuth allowedRoles={["freightOwner"]} />}>
        <Route path={ROUTES.freightOwner.dashboard} element={<FreightOwnerDashboard />} />
        <Route path={ROUTES.freightOwner.createLoad} element={<CreateLoad />} />
        <Route path={ROUTES.freightOwner.loads} element={<ViewLoads />} />
        <Route path={ROUTES.freightOwner.editLoad} element={<EditLoad />} />
        <Route path={ROUTES.freightOwner.viewLoads} element={<Navigate to={ROUTES.freightOwner.loads} replace />} />
        <Route path={ROUTES.freightOwner.loadRequests} element={<LoadRequests />} />
        <Route path={ROUTES.freightOwner.shipments} element={<ViewShipments />} />
        <Route path={ROUTES.freightOwner.tracking} element={<FreightOwnerTrackingPage />} />
        <Route path={ROUTES.freightOwner.recommendedMatches} element={<RecommendedMatches />} />
        <Route path={ROUTES.freightOwner.matchRequests} element={<MatchRequestsPage />} />
        <Route path={ROUTES.freightOwner.ratings} element={<FreightOwnerRatings />} />
      </Route>

      {/* Transporter protected routes */}
      <Route element={<RequireAuth allowedRoles={["transporter"]} />}>
        <Route path={ROUTES.transporter.dashboard} element={<TransporterDashboard />} />
        <Route path={ROUTES.transporter.registerTruck} element={<RegisterTruck />} />
        <Route path={ROUTES.transporter.myTrucks} element={<ViewTrucks />} />
        <Route path={ROUTES.transporter.editTruck} element={<EditTruck />} />
        <Route path={ROUTES.transporter.browseLoads} element={<BrowseLoads />} />
        <Route path={ROUTES.transporter.ratingsPage} element={<RatingsPage />} />
        <Route path={ROUTES.transporter.myRequests} element={<MyRequests />} />
        <Route path={ROUTES.transporter.shipments} element={<MyShipments />} />
        <Route path={ROUTES.transporter.ratings} element={<Ratings />} />
      </Route>

      {/* Admin protected routes */}
      <Route element={<RequireAuth allowedRoles={["admin"]} />}>
        <Route path={ROUTES.admin.dashboard} element={<AdminDashboard />} />
        <Route path={ROUTES.admin.users} element={<UsersPage />} />
        <Route path={ROUTES.admin.disputes} element={<DisputeManagement />} />
        <Route path={ROUTES.admin.audit} element={<AuditLog />} />
        <Route path={ROUTES.admin.ratings} element={<RatingsPage />} />
        <Route path={ROUTES.admin.settings} element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.auth.login} replace />} />
    </Routes>
  );
};

export default AppRoutes;
