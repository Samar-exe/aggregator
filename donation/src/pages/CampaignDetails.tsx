import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
}

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  const fetchCampaign = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/campaign/${id}`);
      setCampaign(response.data);
    } catch (error) {
      console.error("Error fetching campaign", error);
    }
  };

  if (!campaign) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">{campaign.title}</h1>
        <p className="text-gray-700 mb-4">{campaign.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600">Goal: ${campaign.goalAmount}</p>
            <p className="text-gray-600">Raised: ${campaign.raisedAmount}</p>
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition duration-300">
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;