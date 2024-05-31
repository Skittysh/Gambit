"use client";
import React, { useEffect, useState } from 'react';
import { signalRService } from '../services/signalrService';

type Room = {
    roomId: number;
    username: string;
};

const WaitingRoomPage = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [username, setUsername] = useState<string>("");
    const [roomNumber, setRoomNumber] = useState<number>(4);

    useEffect(() => {
        const handleJoinRoom = (roomId: number, username: string) => {
            console.log(`${username} joined room ${roomId}`);
            setRooms(prevRooms => [...prevRooms, { roomId, username }]);
        };

        const handleLeaveRoom = (roomId: number, username: string) => {
            console.log(`${username} left room ${roomId}`);
            setRooms(prevRooms => prevRooms.filter(room => room.roomId !== roomId || room.username !== username));
        };


        signalRService.LeaveRoom((roomId: number, username: string) => handleJoinRoom(roomId, username));

        return () => {
            signalRService.connection.off("JoinRoom", handleJoinRoom);
            signalRService.connection.off("LeaveRoom", handleLeaveRoom);
        };
    }, [signalRService]);

    const handleAddRoom = (roomCtr: number) => {
        console.log(`${roomCtr}`)
    }
    const handleClickAddRoom = () => {
        signalRService.AddRoom(handleAddRoom);
    };

    const handleJoinRoomClick = (id: number) => {
        // signalRService.JoinRoom(id, username)
    };

    const handleLeaveRoomClick = () => {
        // Function to handle leaving a room (implementation depends on your backend logic)
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
            {/* <button onClick={handleJoinRoomClick}>Join Room</button> */}
            {/* <button onClick={handleLeaveRoomClick}>Leave Room</button> */}
            <button onClick={handleClickAddRoom}>AddRoom</button>

            <div>
                <h2>Rooms:</h2>
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

