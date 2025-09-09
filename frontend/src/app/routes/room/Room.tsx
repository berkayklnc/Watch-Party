import {useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import axios from "@helpers/axios";

interface RoomProps {
    socket: Socket;
}
export default function Room({socket}:RoomProps) {
    const {roomId} = useParams();
    const [status, setStatus] = useState("Odaya bağlanıyor...");
    const [userName,setUserName] = useState(localStorage.getItem('userName') || "")
    axios.get('/')
    useEffect(() => {
        setStatus(`Oda ID: ${roomId}`);
        window.postMessage({ source: "FROM_REACT",action:"join_room",roomId:roomId }, "*");
    }, [roomId, socket]);

    function handleSubmit(e:any) {
        e.preventDefault();
        window.postMessage({ source: "FROM_REACT",action:"send_message", roomId:roomId, payload: userName }, "*");
    }
    function handleChange(e:any) {
        setUserName(e.target.value);
    }
    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h2>{status}</h2>
            <p>Bu linki arkadaşlarınla paylaş: {window.location.href}</p>

            <div>
                <input id="roomId" type="hidden" value={roomId}/>
                <br/><br/>
                <video id="video1" width="150" controls>
                    <source src="/video.mp4"/>
                    Your browser does not support HTML video.
                </video>
                <form onSubmit={handleSubmit} action="">
                    <input value={userName}
                           onChange={handleChange}
                           type="text"/>
                    <input type="submit"/>
                </form>
            </div>
            <div>
                <h3>Mesajlar</h3>
                <div id="chatbox"></div>
            </div>
        </div>


    );
}
