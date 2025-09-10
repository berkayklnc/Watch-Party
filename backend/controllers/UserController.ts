import UserRepository from "../repositories/UserRepository.ts";
import RoomController from "./RoomController.ts";
import * as interfaces from "../interfaces/index.ts";
export default class UserController {
    public static async jointoRoom(username,socket_id,room_id){
        const room:interfaces.Room = await RoomController.createorUpdateRoom(room_id)
        const new_user:interfaces.User = await UserController.createUser(username,socket_id);
        const last = await RoomController.addUserToRoom(room,new_user)
        console.log(last)
    }
    public static async createUser (username,socket_id) {
        try {
            return await UserRepository.createUser(username,socket_id);
        } catch (error) {
            return error
        }
    };
    public static async deleteUser (socket_id)  {
        try {
            return await UserRepository.deleteUser(socket_id);
        } catch (error) {
            return error
        }
    };
}


