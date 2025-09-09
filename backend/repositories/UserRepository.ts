import db from '../db.js';
export default class UserRepository {
    public static async createUser (username,socketId)  {
        const query = `
        INSERT INTO users (username, socket_id)
        VALUES ($1, $2)
        RETURNING *;
    `;
        return db.one(query, [username, socketId]);
    };
    public static async  deleteUser (socketId) {
        const query = `
        DELETE FROM users 
        WHERE socket_id = $1
        RETURNING *;
    `;
        return db.oneOrNone(query, [socketId]);
    };
}

