import db from '../db.js';
import * as interfaces from "../interfaces/index.ts";
export default class RoomRepository {
    public static async createorUpdateRoom (room_id)  {
        const query = `
        INSERT INTO rooms (room_id)
        VALUES ($1)
        ON CONFLICT (room_id) DO UPDATE
        SET last_active = CURRENT_TIMESTAMP
        RETURNING *;
    `;
        return db.one(query, [room_id]);
    };
    public static async  addUsertoRoom (room:interfaces.Room,user:interfaces.User) {
        const query = `
        INSERT INTO room_users (room_id,socket_id)
        VALUES ($1,$2)
        RETURNING *;
    `;
        return db.one(query, [room.room_id,user.socket_id]);
    };
}

