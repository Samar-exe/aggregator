import React, { useState } from "react";
import axios from "axios";

const AdminSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    MasjidName: "",
    adminName: "",
    password: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/createAdmin",
        formData
      );
      alert(response.data.message);
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up as Admin</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="MasjidName"
            placeholder="Masjid Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="adminName"
            placeholder="Admin Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Request Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;