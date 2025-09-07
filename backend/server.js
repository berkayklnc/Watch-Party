import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import {setDB} from "./db.js"
const app = express();
app.use(cors());
setDB()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`${socket.id} odaya katıldı`);
        const rooms = io.of("/").adapter.rooms;
    });

    socket.on("video:play", (data) => {
        //console.log("video başladı server mesajı data id:" , data)
        socket.to(data.roomId).emit("video:play",data.currentTime);
    });

    socket.on("video:pause", (data) => {
        //console.log("video durdu server mesajı data id:" , data)
        socket.to(data.roomId).emit("video:pause", data.currentTime);
    });

    socket.on("video:seek", (data) => {
        //console.log("video atladı server mesajı",data)
        socket.to(data.roomId).emit("video:seek", data.currentTime);
    });

    socket.on("disconnect", () => {
        console.log("Kullanıcı ayrıldı:", socket.id);
    });

});
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Socket.IO server ${PORT} portunda çalışıyor`);

});
