import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

import AuthLayout from "../../layouts/AuthLayout";
import FormTitle from "../../components/ui/FormTitle";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  // Redirect already-authenticated users to their dashboard
  useEffect(() => {
    if (user) {
      const roleRoutes = {
        freightOwner: "/freight-owner/dashboard",
        transporter: "/transporter/dashboard",
        admin: "/admin/dashboard",
      };
      navigate(roleRoutes[user.role] || "/login", {
        replace: true,
      });
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = loginUser(
      formData.email.toLowerCase(),
      formData.password
    );

    if (!result.success) {
      setErrors({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });

      return;
    }

    // Update Auth Context
    setUser(result.user);

    const normalizedRole = result.user.role?.toString().trim().toLowerCase();

    // Redirect by role
    switch (normalizedRole) {
      case "freightowner":
        navigate("/freight-owner/dashboard");
        break;

      case "transporter":
        navigate("/transporter/dashboard");
        break;

      case "admin":
        navigate("/admin/dashboard");
        break;

      default:
        navigate("/");
    }
  };

  return (
    <AuthLayout>
      <FormTitle
        title="Welcome Back"
        subtitle="Login to your Truck Asset Matchmaking Platform account"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          icon={<FaEnvelope />}
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          icon={<FaLock />}
          error={errors.password}
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="text-[#B59F78] hover:underline font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          icon={<FaArrowRight />}
        >
          Login
        </Button>

        <div className="text-center text-gray-600">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-[#B59F78] hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
