import db from '../db.js';
import * as interfaces from "../interfaces/index.ts";
export default class RoomRepository {
    public static async getUsers (room_id:string) {
        const query = `
        SELECT users.username,room_users.is_admin
        FROM users
        INNER JOIN room_users 
            ON room_users.socket_id=users.socket_id
        WHERE room_users.room_id = $1;
    `;
        return db.manyOrNone(query, [room_id]);
    }
    public static async createOrUpdateRoom (room_id:string)  {
        const query = `
        INSERT INTO rooms (room_id)
        VALUES ($1)
        ON CONFLICT (room_id) DO UPDATE
        SET last_active = CURRENT_TIMESTAMP
        RETURNING *;
    `;
        return db.one(query, [room_id]);
    };
    public static async  addUserToRoom (room:interfaces.Room,user:interfaces.User) {
        const query = `
        INSERT INTO room_users (room_id,socket_id,is_admin)
        VALUES ($1,
        $2,
        NOT EXISTS (SELECT 1 FROM room_users WHERE room_id = $1))
        RETURNING *;
    `;
        return db.one(query, [room.room_id,user.socket_id]);
    };
}

