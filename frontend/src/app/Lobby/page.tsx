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
        if (selectedRoom !== null && username) {
            signalRService.joinRoom(selectedRoom, username);
        }
    };

    const handleClickLeaveRoom = (roomId: number) => {
        signalRService.leaveRoom(roomId, username);
    };

    return (
        <div className='p-24'>
            <h1>Waiting Room</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
            />
            <button onClick={handleClickAddRoom}>Add Room</button>

            <div>
                <h2>Available Rooms:</h2>
                <ul>
                    {Array.from({ length: roomCount }, (_, roomIndex) => (
                        <li key={roomIndex}>
                            Room ID: {roomIndex + 1}
                            <button onClick={() => setSelectedRoom(roomIndex + 1)}>Select Room</button>
                            <button onClick={() => handleClickLeaveRoom(roomIndex + 1)}>Leave Room</button>
                        </li>
                    ))}
                </ul>
                <button onClick={handleClickJoinRoom}>Join Selected Room</button>
            </div>

            <div>
                <h2>Joined Rooms:</h2>
                <ul>
                    {rooms.map((room, index) => (
                        <li key={index}>
                            Room ID: {room.roomId}, Username: {room.username}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WaitingRoomPage;
