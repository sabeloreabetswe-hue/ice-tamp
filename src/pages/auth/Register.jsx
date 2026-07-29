import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaLock,
} from "react-icons/fa";

import { registerUser } from "../../services/authService";

import AuthLayout from "../../layouts/AuthLayout";
import FormTitle from "../../components/ui/FormTitle";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";
import RoleSelector from "../../components/ui/RoleSelector";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "freightOwner",
    fullName: "",
    company: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // Remove the error as the user types
    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData((current) => ({
      ...current,
      role,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Company
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = registerUser({
      role: formData.role,
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      password: formData.password,
    });

    if (!result.success) {
      setErrors({
        email: result.message,
      });

      return;
    }

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <AuthLayout>
      <FormTitle
        title="Create Account"
        subtitle="Join the Truck Asset Matchmaking Platform"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <RoleSelector
          selectedRole={formData.role}
          onSelect={handleRoleSelect}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            icon={<FaUser />}
            error={errors.fullName}
          />

          <Input
            label="Company / Business Name"
            name="company"
            placeholder="Enter your company name"
            value={formData.company}
            onChange={handleChange}
            icon={<FaBuilding />}
            error={errors.company}
          />

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

          <Input
            label="Phone Number"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            icon={<FaPhone />}
            error={errors.phone}
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            icon={<FaLock />}
            error={errors.password}
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={<FaLock />}
            error={errors.confirmPassword}
          />
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-[#F4F4E6] p-4">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 accent-[#2A3663]"
          />

          <label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-6"
          >
            I agree to the{" "}
            <span className="font-semibold text-[#B59F78] cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-semibold text-[#B59F78] cursor-pointer">
              Privacy Policy
            </span>
          </label>
        </div>

        <Button
          type="submit"
          icon={<FaArrowRight />}
        >
          Create Account
        </Button>

        <p className="text-center text-gray-600">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-[#B59F78] hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
