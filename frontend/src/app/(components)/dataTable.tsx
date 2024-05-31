"use client";
import React, { useEffect, useState } from 'react';
import { FaSnowflake, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5011/API/Results');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: any) => {
        try {
            await axios.delete(`http://localhost:5011/API/Results/${id}`);
            // Update the data state by filtering out the deleted item
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // const handleEdit = (id) => {
    //   // Implement edit functionality here
    //   console.log(`Editing item with ID: ${id}`);
    // };

    return (
        <div className="min-w-full bg-white rounded-lg p-4">
            <table className="min-w-full bg-blue-100 rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="p-4 text-left">ID</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Score</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-blue-200 transition duration-200 ease-in-out transform hover:-translate-y-1">
                            <td className="p-4">{item.id}</td>
                            <td className="p-4">{item.name}</td>
                            <td className="p-4">{item.score}</td>
                            <td className="p-4 flex items-center">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="flex items-center text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
                                >
                                    <FaTrash className="mr-2" />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;