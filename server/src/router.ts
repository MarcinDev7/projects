import { Router } from "express";
import { IssuesController } from "./controllers/issues.controller";

const router = Router();

router.get("/issues", IssuesController.get);

router.get("/issues/:id", IssuesController.findOne);

router.delete("/issues/:id", IssuesController.remove);

router.put("/issues/:id", IssuesController.update);

router.post("/issues", IssuesController.create);

export default router;
