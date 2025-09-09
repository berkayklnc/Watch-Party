import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import db from "./db.js"
import {registerSocket} from "./sockets/index.ts";
import apiRoutes from "./routes/index.ts"
const app = express();
app.use(cors());

app.use('/api', apiRoutes);
app.get('/', (req, res) => {
    res.send('hello world')
})

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
registerSocket(io);
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Socket.IO server ${PORT} portunda çalışıyor`);
});
