// gameGame.tsx

import React, { useEffect, useState } from 'react';
import { signalRService } from '../services/signalrService';

const CardGame: React.FC = () => {
    const [user, setUser] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [allScores, setAllScores] = useState<{ [user: string]: number }>({});
    const [cardsPlayer1, setCardsPlayer1] = useState<any[]>([]);
    const [cardsPlayer2, setCardsPlayer2] = useState<any[]>([]);

    useEffect(() => {
        const handleReceiveScore = (user: string, newScore: number) => {
            setScore(newScore);
            setAllScores(prevScores => ({ ...prevScores, [user]: newScore }));
        };

        const handleDisplayCards = (cards: any[]) => {
            setCardsPlayer1(cards);
        };

        const handleDisplay2Cards = (cards: any[]) => {
            setCardsPlayer2(cards);
        };

        const handleReceiveAllScores = (user: string, score: number) => {
            setAllScores(prevScores => ({ ...prevScores, [user]: score }));
        };

        const handlePlayerJoin = (user: string) => {
            console.log(`${user} has joined the game.`);
        };

        signalRService.onReceiveScore(handleReceiveScore);
        signalRService.onDisplayCards(handleDisplayCards);
        signalRService.onDisplay2Cards(handleDisplay2Cards);
        signalRService.onReceiveAllScores(handleReceiveAllScores);
        signalRService.onPlayerJoin(handlePlayerJoin);

        return () => {
            signalRService.offReceiveScore(handleReceiveScore);
            signalRService.offDisplayCards(handleDisplayCards);
            signalRService.offDisplay2Cards(handleDisplay2Cards);
            signalRService.offReceiveAllScores(handleReceiveAllScores);
            signalRService.offPlayerJoin(handlePlayerJoin);
        };
    }, []);

    const handleJoinGame = () => {
        if (user) {
            signalRService.joinPlayer(user);
        }
    };

    const handleCardPick = (points: number) => {
        signalRService.pickCard(user, points);
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
                            required
                            maxLength={12}
                        />
                    </label>
                    <button
                        onClick={handleJoinGame}
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Join Game
                    </button>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg text-gray-800 mb-2">Pick a Card:</h3>
                    <div className="flex justify-between space-x-2">
                        {cardsPlayer1.map((card) => (
                            <button
                                key={card.ider}
                                className="flex-1 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all duration-300"
                                onClick={() => { handleCardPick(card.rank); }}
                            >
                                Card {card.rank}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg text-gray-800 mb-2">Cards for player 2:</h3>
                    <div className="flex justify-between space-x-2">
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h3 className="text-lg text-gray-800">Scores:</h3>
                    {Object.entries(allScores).map(([user, score]) => (
                        <p key={user}><span className="font-bold">{user}:</span> {score}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardGame;
