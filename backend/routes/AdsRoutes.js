import { Router } from 'express';
import * as AdsController from '../controllers/AdsController.js';
import verifyToken from "../middleware/auth.js";
import upload from '../config/multer.js';

const router = Router();

router.get("/", AdsController.getAll);
router.get("/search", AdsController.search);
router.post("/", verifyToken, upload.single('image'), AdsController.create);
router.get("/:id", AdsController.getById);
router.put("/:id", verifyToken, AdsController.update);
router.patch("/:id", verifyToken, AdsController.update);
router.delete("/:id", verifyToken, AdsController.remove);



export default router;
