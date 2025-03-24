import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

interface PendingApproval {
  email: string;
  adminName: string;
}

const PlatformControl: React.FC = () => {
  const { isAuthenticated, isMaster } = useAuth();
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);

  useEffect(() => {
    if (isAuthenticated && isMaster) {
      fetchPendingApprovals();
    }
  }, [isAuthenticated, isMaster]);

  const fetchPendingApprovals = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/pendingApprovals");
      setPendingApprovals(response.data);
    } catch (error) {
      console.error("Error fetching pending approvals", error);
    }
  };

  const approveAdmin = async (email: string) => {
    try {
      await axios.post("http://localhost:3000/api/admin/approveAdmin", { email });
      alert("Admin approved and added to the database");
      setPendingApprovals(pendingApprovals.filter(admin => admin.email !== email));
    } catch (error) {
      console.error("Error approving admin", error);
    }
  };

  const rejectAdmin = async (email: string) => {
    try {
      await axios.post("http://localhost:3000/api/admin/rejectAdmin", { email });
      alert("Admin request rejected and removed from the database");
      setPendingApprovals(pendingApprovals.filter(admin => admin.email !== email));
    } catch (error) {
      console.error("Error rejecting admin", error);
    }
  };

  if (!isAuthenticated || !isMaster) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold text-center mb-4">Pending Approvals</h2>
        {pendingApprovals.map((admin) => (
          <div key={admin.email} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <p className="font-medium">{admin.adminName} requested approval.</p>
            <p className="text-gray-600">{admin.email}</p>
            <div className="mt-2 flex justify-between">
              <button onClick={() => approveAdmin(admin.email)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Approve</button>
              <button onClick={() => rejectAdmin(admin.email)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformControl;