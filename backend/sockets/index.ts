import { Server } from "socket.io";
import UserController from "../controllers/UserController.ts";
import RoomController from "../controllers/RoomController.ts";

interface videoData {
    roomId:number,
    currentTime:number
}
export function registerSocket(io: Server) {
    io.on("connection", (socket) => {

        socket.on("join-room", async (room_id, username) => {
            socket.join(room_id);
            await UserController.jointoRoom(username,socket.id,room_id)
            if (username) {
                console.log(`${socket.id} odaya katıldı`);
            }
        });

        socket.on("video:play", (data:videoData) => {
            socket.to(data.roomId).emit("video:play",data.currentTime);
        });

        socket.on("video:pause", (data:videoData) => {
            socket.to(data.roomId).emit("video:pause", data.currentTime);
        });

        socket.on("video:seek", (data:videoData) => {
            socket.to(data.roomId).emit("video:seek", data.currentTime);
        });

        socket.on("disconnect", async () => {
            await UserController.deleteUser(socket.id);
            console.log('kullanıcı ayrıldı')
        });

    });

}
