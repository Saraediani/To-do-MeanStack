import express from "express";
const router = express.Router();
import {verifyToken} from "../middleware/auth.js";

import {addtask, getTask, getTasks, updatetask, deletetask} from "../controllers/TasksCont.js";

router
  .route("/tasks")
  .post(verifyToken,addtask)
  .get(verifyToken,getTasks)
router.route("/tasks/:id").get(verifyToken,getTask)
  .put(verifyToken,updatetask)
  .delete(verifyToken,deletetask);

export default router;