// pages/scores.tsx
"use client"
import { useEffect, useState } from 'react';
import { signalRService } from '../services/signalrService';

const ScoresPage = () => {
    const [scores, setScores] = useState<{ [key: string]: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            await signalRService
            const fetchedScores = await signalRService.getAllScores();
            console.log("Fetched scores in component: ", fetchedScores); // Log the fetched scores in the component
            setScores(fetchedScores);
            setLoading(false);
        };

        fetchScores();
    }, []);

    return (
        <div className='p-56'>
            <h1>Player Scores</h1>
            {loading ? (
                <p>Loading scores...</p>
            ) : scores ? (
                <ul>
                    {Object.entries(scores).map(([player, score]) => (
                        <li key={player}>
                            {player}: {score}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No scores available</p>
            )}
        </div>
    );
};

export default ScoresPage;
