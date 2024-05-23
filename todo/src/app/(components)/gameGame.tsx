import React, { useEffect, useState } from 'react';
import { FaSnowflake } from 'react-icons/fa';

import { signalRService } from '../services/signalrService';

const CardGame: React.FC = () => {
    const [moves, setMoves] = useState<string[]>([]);
    const [user, setUser] = useState<string>("");
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const handleReceiveMove = (user: string, move: string) => {
            setMoves(prevMoves => [...prevMoves, `${user}: ${move}`]);
        };

        const handleReceiveScore = (user: string, newScore: number) => {
            setScore(newScore);
        };

        signalRService.onReceiveMove(handleReceiveMove);
        signalRService.onReceiveScore(handleReceiveScore);

        return () => {
            signalRService.offReceiveMove(handleReceiveMove);
            signalRService.offReceiveScore(handleReceiveScore);
        };
    }, []);

    const handleCardPick = (points: number) => {
        signalRService.pickCard(user, points);
    };

    const handleMove = () => {
        const move = `Move at ${new Date().toLocaleTimeString()}`;
        signalRService.sendMove(user, move);
    };

    return (
        <div className="p-20 bg-blue-50 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                <div className="flex items-center mb-4">
                    <label className="flex-grow">
                        <span className="block text-gray-700">Your Name:</span>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </label>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg text-gray-800 mb-2">Pick a Card:</h3>
                    <div className="flex justify-between space-x-2">
                        {[1, 2, 3, 4, 5].map((points) => (
                            <button
                                key={points}
                                onClick={() => { handleCardPick(points); handleMove(); }}
                                className="flex-1 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all duration-300"
                            >
                                <FaSnowflake className="inline-block text-blue-500 mr-2" />
                                Card {points}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg text-gray-800 mb-2">Moves:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        {moves.map((move, index) => (
                            <li key={index} className="text-gray-700">{move}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg text-gray-800">Your Score: <span className="font-bold">{score}</span></h3>
                </div>
            </div>
        </div>
    );
};

export default CardGame;
