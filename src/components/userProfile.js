import { Password } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRegistration = () =>
{
  const [user, setUser] = useState({
    name: '',
    email: '',
    class: '',
    phoneNumber: '',
    address: '',
    password: ''
  });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
  {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try
    {
      const response = await fetch(`${baseUrl}/api/v1/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data.status === 201)
      {
        setMessage('User registered successfully!');

      }
    } catch (error)
    {
      setMessage('Failed to register user.');
    }
  };

  const handleLogin = async () =>
  {
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">User Registration</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Class:</label>
            <input
              type="text"
              name="class"
              value={user.class}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Password:</label>
            <input
              // type="tel"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md"
              required
            />
          </div>
          <div className="mb-4 col-span-2">
            <label className="block text-gray-800 font-medium mb-2">Address:</label>
            <textarea
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            type="submit"
            className="w-full bg-blue-700 text-white font-medium p-3 rounded-md hover:bg-blue-800 transition-colors"
          >
            Login
          </button>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-medium p-3 rounded-md hover:bg-blue-800 transition-colors"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 text-green-600 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserRegistration;
