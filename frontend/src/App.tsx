import { Routes, Route, BrowserRouter } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "@routes/home/Home.tsx";
import Room from "@routes/room/Room.tsx";

function App() {
    const socket = io("http://localhost:4000");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room/:roomId" element={<Room socket={socket} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
