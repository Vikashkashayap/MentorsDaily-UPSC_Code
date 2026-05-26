import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../../api/coreService";
import { dataHandler } from "../../../utils/dataHandler";
import { ROUTES } from "../../../constants/routesEnum";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};

    if (!form.name) e.name = "Name is required.";
    else if (form.name.length < 2) e.name = "Name must be at least 2 characters.";

    if (!form.email) e.email = "Email is required.";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) e.email = "Enter a valid email.";
    }

    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";

    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";

    if (!form.agreeToTerms) e.agreeToTerms = "You must agree to the terms and conditions.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);

    const result = await dataHandler.handleApiCall(
      () => register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone
      }),
      {
        successMessage: "Registration successful! Please login.",
        errorMessage: "Registration failed. Please try again."
      }
    );

    if (result.status === "success") {
      navigate(ROUTES.LOGIN, { replace: true });
    } else {
      setServerError(result.message || "Registration failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-12">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">
            Create your account
          </h1>

          {serverError && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none ${errors.name ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none ${errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="you@example.com"
                required
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none ${errors.password ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="Create a password"
                required
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none ${errors.confirmPassword ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="Confirm your password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                name="agreeToTerms"
                type="checkbox"
                checked={form.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-xs text-red-500">{errors.agreeToTerms}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 rounded-md text-white font-medium ${loading
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="text-indigo-600 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}