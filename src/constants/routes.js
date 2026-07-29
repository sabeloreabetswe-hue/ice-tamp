// Centralized route definitions for the application.
// Keeping paths here makes navigation updates easier and reduces duplication.
export const ROUTES = {
  auth: {
    root: "/",
    login: "/login",
    register: "/register",
  },
  freightOwner: {
    dashboard: "/freight-owner/dashboard",
    createLoad: "/freight-owner/create-load",
    loads: "/freight-owner/loads",
    tracking: "/freight-owner/tracking",
    editLoad: "/freight-owner/edit-load/:id",
    viewLoads: "/freight-owner/view-loads",
    loadRequests: "/freight-owner/load-requests",
    shipments: "/freight-owner/shipments",
    recommendedMatches: "/freight-owner/recommended-matches",
    matchRequests: "/freight-owner/match-requests",
    ratings: "/freight-owner/ratings",
  },
  transporter: {
    dashboard: "/transporter/dashboard",
    registerTruck: "/transporter/register-truck",
    myTrucks: "/transporter/my-trucks",
    editTruck: "/transporter/edit-truck/:id",
    browseLoads: "/transporter/browse-loads",
    ratingsPage: "/transporter/ratings-page",
    myRequests: "/transporter/my-requests",
    shipments: "/transporter/shipments",
    ratings: "/transporter/ratings",
  },
  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    disputes: "/admin/disputes",
    audit: "/admin/audit",
    ratings: "/admin/ratings",
    settings: "/admin/settings",
  },
};
