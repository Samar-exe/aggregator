import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FeaturedDonations from '../components/FeaturedDonations';
import SpecificDonations from '../components/SpecificDonations';

interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
}

const DonationService: React.FC = () => {
  const [randomHadith, setRandomHadith] = useState('');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Collection of hadiths on charity
  const charityHadiths = [
    "The Prophet Muhammad (peace be upon him) said: \"Charity does not decrease wealth, no one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.\" (Muslim)",
    
    "The Prophet said: \"The upper hand is better than the lower hand. The upper hand is the one that gives, and the lower hand is the one that takes.\" (Bukhari and Muslim)",
    
    "The Prophet said: \"Every Muslim has to give charity.\" When asked what if someone has nothing to give, he replied: \"He should work with his hands and benefit himself and also give in charity.\" (Bukhari)",
    
    "The Prophet said: \"Charity is prescribed for each descendant of Adam every day the sun rises.\" (Bukhari)",
    
    "The Prophet said: \"Give charity without delay, for it stands in the way of calamity.\" (Tirmidhi)",
    
    "The Prophet said: \"The believer's shade on the Day of Resurrection will be his charity.\" (Tirmidhi)",
    
    "The Prophet said: \"Save yourself from hellfire by giving even half a date in charity.\" (Bukhari)",
    
    "The Prophet said: \"When a man dies, his deeds come to an end except for three things: Sadaqah Jariyah (continuous charity), knowledge which is beneficial, or a virtuous descendant who prays for him.\" (Muslim)"
  ];

  // Select a random hadith when component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * charityHadiths.length);
    setRandomHadith(charityHadiths[randomIndex]);
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/campaigns');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns', error);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Donation & Charity</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto italic leading-relaxed mb-12">"{randomHadith}"</p>
        </div>
      </div>
      
      {/* Featured Donations Carousel */}
      <FeaturedDonations />
      {/* Specific Donations Section */}
      <SpecificDonations />

      {/* Impact Statistics */}
      <div className="px-10" >
        <div className="mt-20 mb-16 bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-2xl p-12 text-white shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Global Impact</h2>
            <p className="text-lg opacity-90">Together we're creating lasting change in communities worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">$2.5M+</div>
              <div className="text-lg opacity-90">Donations Raised</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">50+</div>
              <div className="text-lg opacity-90">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">10K+</div>
              <div className="text-lg opacity-90">Lives Impacted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Campaigns Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl mt-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Donation Campaigns</h2>
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
    </div>
  );
};

export default DonationService;