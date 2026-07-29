import {
  FaHome,
  FaTruck,
  FaBoxOpen,
  FaUsers,
  FaChartBar,
  FaCog,
  FaClipboardList,
  FaShippingFast,
} from "react-icons/fa";

export const freightOwnerMenu = [
  { name: "Dashboard", icon: <FaHome />, path: "/freight-owner/dashboard" },
  { name: "Create Load", icon: <FaBoxOpen />, path: "/freight-owner/create-load" },
  { name: "My Loads", icon: <FaTruck />, path: "/freight-owner/loads" },
  {name: "Load Requests",path: "/freight-owner/load-requests", icon: <FaClipboardList />,},
  { name: "Shipments", path: "/freight-owner/shipments", icon: <FaShippingFast /> },
  { name: "Tracking", path: "/freight-owner/tracking", icon: <FaChartBar /> },
  {name:"Review suggested transporters ", path:"/freight-owner/match-requests", icon: <FaClipboardList />},
  { name: "Ratings", icon: <FaChartBar />, path: "/freight-owner/ratings" },
  
];

export const transporterMenu = [
  { name: "Dashboard", icon: <FaHome />, path: "/transporter/dashboard" },
  { name: "Register Truck", icon: <FaTruck />, path: "/transporter/register-truck" },
  { name: "My Trucks", icon: <FaTruck />, path: "/transporter/my-trucks" },
  { name: "Browse Loads", icon: <FaBoxOpen />, path: "/transporter/browse-loads" },
  {name: "My Requests", path: "/transporter/my-requests", icon: <FaClipboardList />,},
  { name: "Ratings", icon: <FaChartBar />, path: "/transporter/ratings" },
];

export const adminMenu = [
  { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
  { name: "Users", icon: <FaUsers />, path: "/admin/users" },
  { name: "Audit Trail", icon: <FaClipboardList />, path: "/admin/audit" },
  { name: "Ratings", icon: <FaChartBar />, path: "/admin/ratings" },
  { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
];
