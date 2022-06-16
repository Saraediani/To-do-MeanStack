import express from "express";
const router = express.Router();
import {verifyToken} from "../middleware/auth.js";

import {addtask, getTask, getTasks, updatetask, deletetask} from "../controllers/TasksCont.js";

router
  .route("/tasks")
  .post( addtask)
  .get(verifyToken, getTasks)
router.route("/tasks/:id").get( getTask)
  .put(updatetask)
  .delete( deletetask);

export default router;