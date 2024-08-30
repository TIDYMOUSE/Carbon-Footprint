import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center items-center h-screen flex-col overflow-hidden bg-gray-900">
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/error-background.jpg"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      <div className="relative z-20 text-center flex gap-6 flex-col p-6">
        <p className="text-5xl text-white font-bold">
          Oops! <span className="text-red-600">404</span> Error
        </p>
        <p className="text-3xl text-gray-300">
          Page Not Found
        </p>
        <p className="text-xl text-gray-400">
          Best Regards from <span className="text-accent font-action">Team AI-HTML</span>
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-8 py-3 text-lg text-white bg-red-600 rounded-full hover:bg-red-700 transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
