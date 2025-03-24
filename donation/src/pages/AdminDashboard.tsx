import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
}

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchCampaigns();
    }
  }, [isAuthenticated, isAdmin]);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/campaigns", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return <p className="text-center text-gray-600">Access Denied</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl mt-6">
        <h2 className="text-2xl font-semibold text-center mb-6">My Donation Campaigns</h2>
        {campaigns.length === 0 ? (
          <p className="text-center text-gray-600">No campaigns found.</p>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
              <p className="text-gray-700 mb-4">{campaign.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Goal: ${campaign.goalAmount}</p>
                  <p className="text-gray-600">Raised: ${campaign.raisedAmount}</p>
                </div>
                <Link to={`/campaign/${campaign.id}`} className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition duration-300">
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;