import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login = () => {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center bg-secondary">
      <div className="relative w-[60%] h-[80vh] bg-white rounded-xl overflow-hidden">
        <div 
          className={`z-50 absolute inset-0 w-[50%] h-full transform transition-transform duration-500 ${
            !newUser ? 'translate-x-[100%]' : 'translate-x-0'
          }`}
        >
          <img className="h-full w-full object-cover" src="./login.jpg" alt="Login Background" />
        </div>
        <div 
          className={`absolute inset-0 w-[50%] h-full transform transition-transform duration-500 ${
            !newUser ? 'translate-x-0' : 'translate-x-[100%]'
          } flex flex-col p-16 text-black bg-white`}
        >
          <div className="text-3xl text-center">
            {!newUser ? 'Log In' : 'Sign Up'}
          </div>
          {!newUser ? <LoginForm /> : <SignupForm />}
          {newUser ? (
            <div>
              Already Registered?
              <span
                className="hover:cursor-pointer hover:underline hover:text-red-500 transition-colors duration-200"
                onClick={() => setNewUser(false)}
              >
                Log In
              </span>
            </div>
          ) : (
            <div>
              Don't have an account?
              <span
                className="hover:cursor-pointer hover:underline hover:text-red-500 transition-colors duration-200"
                onClick={() => setNewUser(true)}
              >
                {' '}
                Register
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
