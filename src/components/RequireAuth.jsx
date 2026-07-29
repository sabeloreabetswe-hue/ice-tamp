import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/**
 * RequireAuth
 *
 * Wraps protected routes and enforces both authentication and
 * (optionally) role-based authorization.
 *
 * Props:
 *   - allowedRoles: string[]  (optional) roles permitted to access the route
 *   - children:     node        (optional) for inline wrapping
 *
 * Behavior:
 *   - Unauthenticated users are redirected to /login (preserving the
 *     intended destination in state so they can be sent back after login).
 *   - Authenticated users whose role is not in `allowedRoles` are
 *     redirected to their own role-specific dashboard.
 *   - When used as a parent route element (no children prop), renders
 *     <Outlet /> so nested child routes are displayed.
 */
const RequireAuth = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in at all
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  const normalizedRole = user.role?.toString().trim().toLowerCase();
  const normalizedAllowedRoles = allowedRoles?.map((role) =>
    role?.toString().trim().toLowerCase()
  );

  // Role-based authorization (if allowedRoles is provided)
  if (
    allowedRoles &&
    !normalizedAllowedRoles.includes(normalizedRole)
  ) {
    // Redirect to the user's own dashboard
    const roleRoutes = {
      freightowner: "/freight-owner/dashboard",
      transporter: "/transporter/dashboard",
      admin: "/admin/dashboard",
    };

    return (
      <Navigate
        to={roleRoutes[normalizedRole] || "/login"}
        replace
      />
    );
  }

  // Inline wrapping (children passed as prop) or route nesting (Outlet)
  return children ? children : <Outlet />;
};

export default RequireAuth;
