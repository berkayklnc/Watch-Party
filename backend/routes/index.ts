import { Router } from "express";

const router = Router();

router.get("/join_room", (req, res) => {
    console.log(req)
    res.send("Merhaba, bu bir GET endpoint!");
});

export default router;
