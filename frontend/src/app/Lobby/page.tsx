"use client";
import React, { useEffect, useState } from 'react';
import { signalRService } from '../services/signalrService';

const WaitingRoomPage = () => {
    const [rooms, setRooms] = useState<{ roomId: number, username: string }[]>([]);
    const [username, setUsername] = useState<string>("");
    const [roomCount, setRoomCount] = useState<number>(0);
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

    useEffect(() => {
        const handleJoinRoom = (roomId: number, username: string) => {
            console.log(`${username} joined room ${roomId}`);
            setRooms(prevRooms => [...prevRooms, { roomId, username }]);
        };

        const handleLeaveRoom = (roomId: number, username: string) => {
            console.log(`${username} left room ${roomId}`);
            setRooms(prevRooms => prevRooms.filter(room => room.roomId !== roomId || room.username !== username));
        };

        const handleAddRoom = (roomCount: number) => {
            console.log(`Number of rooms: ${roomCount}`);
            setRoomCount(roomCount);
        };

        signalRService.onAddRoom(handleAddRoom);
        signalRService.onPlayerJoin(handleJoinRoom);
        signalRService.onPlayerLeave(handleLeaveRoom);

        return () => {
            signalRService.offAddRoom(handleAddRoom);
            signalRService.offPlayerJoin(handleJoinRoom);
            signalRService.offPlayerLeave(handleLeaveRoom);
        };
    }, []);

    const handleClickAddRoom = () => {
        signalRService.addRoom();
    };

    const handleClickJoinRoom = () => {
        if (selectedRoom !== null) {
            if (username) {
                signalRService.joinRoom(selectedRoom, username);
            } else {
                alert('Username is required to join a room');
            }
        }
    };

    const handleClickLeaveRoom = (roomId: number) => {
        signalRService.leaveRoom(roomId, username);
    };

    return (
        <div className='p-24'>
            <h1 className="text-4xl font-bold mb-4">Waiting Room</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button onClick={handleClickAddRoom}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Room
            </button>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">Available Rooms:</h2>
                <ul className="list-disc pl-5">
                    {Array.from({length: roomCount}, (_, roomIndex) => (
                        <li key={roomIndex} className={`mb-2 ${selectedRoom === roomIndex + 1 ? 'bg-green-200' : ''}`}>
                            Room ID: {roomIndex + 1} {selectedRoom === roomIndex + 1 ? '(selected)' : ''}
                            <button onClick={() => setSelectedRoom(roomIndex + 1)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2">Select
                                Room
                            </button>
                            <button onClick={() => handleClickLeaveRoom(roomIndex + 1)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Leave
                                Room
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={handleClickJoinRoom}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Join
                    Selected Room
                </button>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">Joined Rooms:</h2>
                <ul className="list-disc pl-5">
                    {rooms.map((room, index) => (
                        <li key={index} className="mb-2">
                            Room ID: {room.roomId}, Username: {room.username}
                        </li>
                    ))}
                </ul>
            </div>
        </div>);
};

export default WaitingRoomPage;
