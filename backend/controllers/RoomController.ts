import RoomRepository from "../repositories/RoomRepository.ts";
export default class RoomController {
    public static async createorUpdateRoom (room_id:string) {
        try {
            return await RoomRepository.createorUpdateRoom(room_id);
        } catch (error) {
            return error
        }
    };
    public static async addUserToRoom (room,user){
        try {
            console.log(2222)
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


