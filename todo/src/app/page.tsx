"use client";
import React, { useState } from 'react';
import { FaSnowflake } from 'react-icons/fa';
import axios from 'axios';
import DataTable from './(components)/dataTable';

const MyForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id || !name || !score) {
      console.error('All fields are required');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5011/API/Results?Id=${id}&Name=${name}&Score=${score}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="p-10"></div>
      <form onSubmit={handleSubmit} className="space-y-8 p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <div className="text-center">
          <FaSnowflake className="text-blue-500 text-6xl" />
          <h2 className="text-2xl font-bold text-gray-700 mt-4">Winter Form</h2>
        </div>

        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
          <input
            id="id"
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-blue-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-blue-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
          />
        </div>

        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score</label>
          <input
            id="score"
            type="number"
            value={score}
            onChange={e => setScore(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-blue-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
          />
        </div>

        <button
          type="submit"
          onClick={() => window.location.reload()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        >
          Submit
        </button>
        <DataTable />
      </form>

    </div>

  );
};

export default MyForm;