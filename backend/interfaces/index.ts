export interface Room {
    room_id:string;
    last_active:Date;
}

export interface User {
    username:string;
    socket_id:string;
}
