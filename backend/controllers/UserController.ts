import UserRepository from "../repositories/UserRepository.ts";
import RoomController from "./RoomController.ts";
import * as interfaces from "../interfaces/index.ts";
export default class UserController {
    public static async joinToRoom(username:string,socket_id:string,room_id:string){
        try {
        const room:interfaces.Room = await RoomController.createOrUpdateRoom(room_id);
        const new_user:interfaces.User = await UserController.createUser(username,socket_id);
        const last = await RoomController.addUserToRoom(room,new_user);
        }catch (error) {
            return error;
        }
    }
    public static async createUser (username,socket_id) {
        try {
            return await UserRepository.createUser(username,socket_id);
        } catch (error) {
            return error;
        }
    };
    public static async deleteUser (socket_id)  {
        try {
            return await UserRepository.deleteUser(socket_id);
        } catch (error) {
            return error;
        }
    };
}


