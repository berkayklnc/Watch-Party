import { Router } from "express";
import RoomController from "../controllers/RoomController.ts";

const router = Router();

router.get("/:roomId/join_room", async (req, res) => {
    console.log(req.params.roomId)
    res.send(await RoomController.getUsers(req.params.roomId));
});

export default router;
