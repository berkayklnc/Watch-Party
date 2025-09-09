import RoomRepository from "../repositories/RoomRepository.ts";
export default class RoomController {
    public static async createorUpdateRoom (room_id) {
        try {
            return await RoomRepository.createorUpdateRoom(room_id);
        } catch (error) {
            return error
        }
    };
    public static async addUsertoRoom (room,user){
        try {
            return await RoomRepository.addUsertoRoom(room,user)
        }catch (error) {
            return error
        }
    }
    public static async deleteRoom ()  {
        try {
        } catch (error) {
            return error
        }
    };
}


