import React from 'react';

interface FullScreenDialogProps {
  onSelect: (role: 'admin' | 'user') => void;
}

const FullScreenDialog: React.FC<FullScreenDialogProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <p className="mb-8">Please select your role:</p>
        <button
          className="bg-emerald-600 text-white px-4 py-2 rounded-md mr-4"
          onClick={() => onSelect('admin')}
        >
          Sign Up as Admin
        </button>
        <button
          className="bg-emerald-600 text-white px-4 py-2 rounded-md"
          onClick={() => onSelect('user')}
        >
          Sign Up as User
        </button>
      </div>
    </div>
  );
};

export default FullScreenDialog;