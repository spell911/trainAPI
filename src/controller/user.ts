import { Router, Request, Response } from "express";
import { UserService } from "../shared/user";
import { jwt } from "../shared/auth";

const router = Router();

router.get("", jwt.authenticate(), (req: Request, res: Response) => {
  UserService.list((err, result) => {
    res.json(result);
  });
});

export const UserController: Router = router;
