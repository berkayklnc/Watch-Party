import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

interface RoomProps {
    socket: Socket;
}
export default function Room({socket}:RoomProps) {
    const {roomId} = useParams();
    const [status, setStatus] = useState("Odaya bağlanıyor...");

    useEffect(() => {
        setStatus(`Oda ID: ${roomId}`);
        window.postMessage({ type: "FROM_REACT", id: roomId }, "*");
    }, [roomId, socket]);
    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h2>{status}</h2>
            <p>Bu linki arkadaşlarınla paylaş: {window.location.href}</p>

            <div>
                <input id="roomId" type="hidden" value={roomId}/>
                <br/><br/>
                <video id="video1" width="420" controls>
                    <source src="/video.mp4" />
                    Your browser does not support HTML video.
                </video>
            </div>
        </div>


    );
}
