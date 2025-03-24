/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenDialog from "../components/FullScreenDialog";

const Signup: React.FC = () => {
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole: "admin" | "user") => {
    setRole(selectedRole);
    if (selectedRole === "admin") {
      navigate("/admin-signup");
    } else {
      navigate("/user-signup");
    }
  };

  if (!role) {
    return <FullScreenDialog onSelect={handleRoleSelect} />;
  }

  return null;
};

export default Signup;
