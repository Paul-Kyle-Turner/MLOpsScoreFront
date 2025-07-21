import React from 'react';
import { Link } from 'react-router-dom';

const DontSeeYourPlatform: React.FC = () => {
  return (
    <Link 
      to="/create/platform"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
    >
      Don't see your platform?
    </Link>
  );
};

export default DontSeeYourPlatform;