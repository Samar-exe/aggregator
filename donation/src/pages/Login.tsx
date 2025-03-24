import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState<"admin" | "user">("user");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as "admin" | "user");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const endpoint = role === "admin" ? "loginAdmin" : "loginUser";
      const response = await axios.post(`http://localhost:3000/api/${role}/${endpoint}`, formData);
      alert(response.data.message);
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);
      window.location.href = role === "admin" ? "/admin-dashboard" : "/";
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">{role === "admin" ? "Admin Login" : "User Login"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              name="role"
              onChange={handleRoleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;