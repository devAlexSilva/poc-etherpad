import express from "express";
import { middleware } from "../controllers/middleware.js";
import { Pad } from "../controllers/PadController.js";


const router = express.Router()
router.use(middleware)
const pad = new Pad()

router.post('/', async(req, res) => {
    const name = req.body.name;
    const key = req.body.key || '';
    const isPrivate = req.body.isPrivate || false;
    const id = req.baseUrl;

    const data = await pad.create(name, key, isPrivate, id)
    res.send(data)
})

export { router as pad }