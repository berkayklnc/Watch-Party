CREATE TABLE IF NOT EXISTS users (
 user_id SERIAL PRIMARY KEY NOT NULL,
 username TEXT NOT NULL,
 socket_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
 room_id TEXT PRIMARY KEY NOT NULL,
 last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS room_users (
 room_id TEXT NOT NULL,
 user_id INT NOT NULL,
 isAdmin BOOLEAN DEFAULT FALSE NOT NULL,
 CONSTRAINT fk_room FOREIGN KEY (room_id)
    REFERENCES rooms(room_id),
 CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS chats (
 username TEXT NOT NULL,
 room_id TEXT NOT NULL,
 message TEXT NOT NULL,
 timespan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_room FOREIGN KEY (room_id)
     REFERENCES rooms(room_id)
);

CREATE TABLE IF NOT EXISTS room_videos (
 room_id TEXT NOT NULL,
 video_link TEXT NOT NULL,
 who_added TEXT NOT NULL,
 CONSTRAINT fk_room FOREIGN KEY (room_id)
     REFERENCES rooms(room_id)
);
