import express from "express";
import { middleware } from "../controllers/middleware.js";
import { Pad } from "../controllers/PadController.js";

const router = express.Router();
router.use(middleware);
const pad = new Pad();

router.post("/", async (req, res) => {
  try {
    const data = await pad.create(req);
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/sub", async (req, res) => {
  try {
    const data = await pad.sign(req);
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await pad.getById(req);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await pad.deleteById(req);
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

export { router as pad };
