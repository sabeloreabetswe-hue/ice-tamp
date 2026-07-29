import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaClipboardList,
  FaExclamationTriangle,
  FaRedo,
  FaSave,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";
import { ROUTES } from "../../constants/routes";
import { getAdminStats, getAdminSettings, resetAdminSettings, saveAdminSettings } from "../../services/adminService";
import { getCurrentUser } from "../../services/authService";

const toggleButtonClass = (enabled) =>
  enabled
    ? "border-emerald-200 bg-emerald-50"
    : "border-gray-200 bg-gray-50";

const SettingsPage = () => {
  const currentUser = getCurrentUser();
  const [settings, setSettings] = useState(getAdminSettings());
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLoads: 0,
    totalShipments: 0,
    totalActivities: 0,
  });
  const [message, setMessage] = useState("Changes are saved locally for this demo environment.");

  useEffect(() => {
    setStats(getAdminStats());
    setSettings(getAdminSettings());
  }, []);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNumericChange = (event) => {
    const { name, value } = event.target;
    setSettings((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSave = () => {
    saveAdminSettings(settings);
    setMessage("Settings saved successfully.");
  };

  const handleReset = () => {
    const defaults = resetAdminSettings();
    setSettings(defaults);
    setMessage("Settings reset to defaults.");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2A3663]">Admin Settings</h1>
            <p className="mt-2 text-gray-600">
              Control platform access, moderation, notifications, and operating policy from one place.
            </p>
          </div>
          <div className="rounded-full bg-[#F4F4E6] px-3 py-1 text-sm font-medium text-[#2A3663]">
            Role: {currentUser?.role || "Admin"}
          </div>
        </div>

        {message && (
          <div className="rounded-2xl border border-[#e9e2d0] bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
            {message}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-[#2A3663]" />
                <div>
                  <h2 className="text-xl font-semibold text-[#2A3663]">Platform access</h2>
                  <p className="text-sm text-gray-600">Manage who can join and how the platform behaves.</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleToggle("allowRegistration")}
                  className={`rounded-xl border p-4 text-left ${toggleButtonClass(settings.allowRegistration)}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2A3663]">Allow registrations</span>
                    <span className={`h-6 w-12 rounded-full p-1 ${settings.allowRegistration ? "bg-emerald-600" : "bg-gray-300"}`}>
                      <span className={`block h-4 w-4 rounded-full bg-white transition ${settings.allowRegistration ? "translate-x-6" : ""}`} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Turn new account signups on or off.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle("maintenanceMode")}
                  className={`rounded-xl border p-4 text-left ${toggleButtonClass(settings.maintenanceMode)}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2A3663]">Maintenance mode</span>
                    <span className={`h-6 w-12 rounded-full p-1 ${settings.maintenanceMode ? "bg-amber-600" : "bg-gray-300"}`}>
                      <span className={`block h-4 w-4 rounded-full bg-white transition ${settings.maintenanceMode ? "translate-x-6" : ""}`} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Pause public platform activity when needed.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle("requireVerification")}
                  className={`rounded-xl border p-4 text-left ${toggleButtonClass(settings.requireVerification)}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2A3663]">Require verification</span>
                    <span className={`h-6 w-12 rounded-full p-1 ${settings.requireVerification ? "bg-blue-600" : "bg-gray-300"}`}>
                      <span className={`block h-4 w-4 rounded-full bg-white transition ${settings.requireVerification ? "translate-x-6" : ""}`} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Force identity and compliance checks before access is granted.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle("autoApproveLoads")}
                  className={`rounded-xl border p-4 text-left ${toggleButtonClass(settings.autoApproveLoads)}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2A3663]">Auto-approve loads</span>
                    <span className={`h-6 w-12 rounded-full p-1 ${settings.autoApproveLoads ? "bg-indigo-600" : "bg-gray-300"}`}>
                      <span className={`block h-4 w-4 rounded-full bg-white transition ${settings.autoApproveLoads ? "translate-x-6" : ""}`} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Lower manual review effort for straightforward load requests.</p>
                </button>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <FaChartBar className="text-[#2A3663]" />
                <div>
                  <h2 className="text-xl font-semibold text-[#2A3663]">Operations & policy</h2>
                  <p className="text-sm text-gray-600">Set practical limits and daily operating rules.</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="rounded-xl border border-gray-200 p-4">
                  <span className="text-sm font-semibold text-[#2A3663]">Max loads per freight owner</span>
                  <input
                    type="number"
                    name="maxLoadsPerOwner"
                    value={settings.maxLoadsPerOwner}
                    onChange={handleNumericChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>

                <label className="rounded-xl border border-gray-200 p-4">
                  <span className="text-sm font-semibold text-[#2A3663]">Max active shipments per transporter</span>
                  <input
                    type="number"
                    name="maxActiveShipmentsPerTransporter"
                    value={settings.maxActiveShipmentsPerTransporter}
                    onChange={handleNumericChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>

                <label className="rounded-xl border border-gray-200 p-4">
                  <span className="text-sm font-semibold text-[#2A3663]">Audit retention (days)</span>
                  <input
                    type="number"
                    name="auditRetentionDays"
                    value={settings.auditRetentionDays}
                    onChange={handleNumericChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>

                <label className="rounded-xl border border-gray-200 p-4">
                  <span className="text-sm font-semibold text-[#2A3663]">Default commission rate (%)</span>
                  <input
                    type="number"
                    name="defaultCommissionRate"
                    value={settings.defaultCommissionRate}
                    onChange={handleNumericChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <FaClipboardList className="text-[#2A3663]" />
                <div>
                  <h2 className="text-xl font-semibold text-[#2A3663]">Communication & moderation</h2>
                  <p className="text-sm text-gray-600">Tune alerts and dispute handling.</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleToggle("emailNotifications")}
                  className={`rounded-xl border p-4 text-left ${toggleButtonClass(settings.emailNotifications)}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2A3663]">Email notifications</span>
                    <span className={`h-6 w-12 rounded-full p-1 ${settings.emailNotifications ? "bg-emerald-600" : "bg-gray-300"}`}>
                      <span className={`block h-4 w-4 rounded-full bg-white transition ${settings.emailNotifications ? "translate-x-6" : ""}`} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Send platform alerts to active admins.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle("weeklyReports")}
                  className={`rounded-xl border p-4 text-left ${toggleButtonClass(settings.weeklyReports)}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2A3663]">Weekly reports</span>
                    <span className={`h-6 w-12 rounded-full p-1 ${settings.weeklyReports ? "bg-purple-600" : "bg-gray-300"}`}>
                      <span className={`block h-4 w-4 rounded-full bg-white transition ${settings.weeklyReports ? "translate-x-6" : ""}`} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Include summarized performance updates in admin emails.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle("allowDisputes")}
                  className={`rounded-xl border p-4 text-left ${toggleButtonClass(settings.allowDisputes)}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2A3663]">Allow disputes</span>
                    <span className={`h-6 w-12 rounded-full p-1 ${settings.allowDisputes ? "bg-rose-600" : "bg-gray-300"}`}>
                      <span className={`block h-4 w-4 rounded-full bg-white transition ${settings.allowDisputes ? "translate-x-6" : ""}`} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Let users open and escalate disputes when issues occur.</p>
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#2A3663]">Quick admin actions</h2>
              <div className="mt-4 space-y-3">
                <Link to={ROUTES.admin.users} className="flex items-center justify-between rounded-xl border border-gray-200 p-3 text-sm font-medium text-[#2A3663] transition hover:bg-[#F4F4E6]">
                  <span className="flex items-center gap-2"><FaUsers /> Manage users</span>
                  <span>Open</span>
                </Link>
                <Link to={ROUTES.admin.audit} className="flex items-center justify-between rounded-xl border border-gray-200 p-3 text-sm font-medium text-[#2A3663] transition hover:bg-[#F4F4E6]">
                  <span className="flex items-center gap-2"><FaClipboardList /> Review audit trail</span>
                  <span>Open</span>
                </Link>
                <Link to={ROUTES.admin.ratings} className="flex items-center justify-between rounded-xl border border-gray-200 p-3 text-sm font-medium text-[#2A3663] transition hover:bg-[#F4F4E6]">
                  <span className="flex items-center gap-2"><FaChartBar /> Review ratings</span>
                  <span>Open</span>
                </Link>
                <Link to={ROUTES.admin.dashboard} className="flex items-center justify-between rounded-xl border border-gray-200 p-3 text-sm font-medium text-[#2A3663] transition hover:bg-[#F4F4E6]">
                  <span className="flex items-center gap-2"><FaExclamationTriangle /> Handle disputes</span>
                  <span>Open</span>
                </Link>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#2A3663]">Current admin profile</h2>
              <div className="mt-4 rounded-xl bg-[#F4F4E6] p-4 text-sm text-gray-700">
                <p className="font-semibold text-[#2A3663]">{currentUser?.fullName || currentUser?.name || "System administrator"}</p>
                <p className="mt-1">{currentUser?.email || "admin@tamp.com"}</p>
                <p className="mt-1">Permissions: user management, moderation, reporting, and platform controls.</p>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#2A3663]">Live platform snapshot</h2>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                  <span>Total users</span>
                  <span className="font-semibold text-[#2A3663]">{stats.totalUsers}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                  <span>Open loads</span>
                  <span className="font-semibold text-[#2A3663]">{stats.totalLoads}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                  <span>Active shipments</span>
                  <span className="font-semibold text-[#2A3663]">{stats.totalShipments}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                  <span>Activity entries</span>
                  <span className="font-semibold text-[#2A3663]">{stats.totalActivities}</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-[#2A3663] px-4 py-2 font-semibold text-white"
          >
            <FaSave /> Save settings
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700"
          >
            <FaRedo /> Reset defaults
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
