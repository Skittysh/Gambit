"use client";
import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { id, name, score };
        try {
            const response = await axios.post('http://localhost:5011/API/Results', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                <input id="id" type="number" onChange={e => setId(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input id="name" type="text" onChange={e => setName(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score</label>
                <input id="score" type="number" onChange={e => setScore(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
            </button>
        </form>
    );
};

export default MyForm;