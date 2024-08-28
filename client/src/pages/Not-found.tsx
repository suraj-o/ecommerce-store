// src/NotFoundPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center ">
        <div className="text-6xl font-bold text-gray-800 mb-4">404</div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-4">Sorry, the page you are looking for does not exist.</p>
        <Link to="/shopping" className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
