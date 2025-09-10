import RoomRepository from "../repositories/RoomRepository.ts";
import * as interfaces from "../interfaces/index.ts";
export default class RoomController {
    public static async createOrUpdateRoom (room_id:string) {
        try {
            return await RoomRepository.createOrUpdateRoom(room_id);
        } catch (error) {
            return error
        }
    };
    public static async addUserToRoom(room:interfaces.Room,user:interfaces.User){
        try {
            return await RoomRepository.addUserToRoom(room,user)
        }catch (error) {
            return error
        }
    }
    public static async getUsers (room_id:string)  {
        try {
            return await RoomRepository.getUsers(room_id)
        } catch (error) {
            return error
        }
    };
}


