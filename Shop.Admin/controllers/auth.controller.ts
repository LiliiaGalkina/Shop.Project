import { IAuthRequisites } from "@Shared/types";
import { Router, Request, Response, NextFunction } from "express";
import { verifyRequisites } from "../models/auth.model";

export const authRouter = Router();

const throwServerError = (res: Response, e: Error) => {
  console.debug(e.message);
  res.status(500);
  res.send("Something went wrong");
};

authRouter.get("/login", async (_req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (e) {
    throwServerError(res, e);
  }
});

 authRouter.post(
   "/authenticate",
   async (req: Request<{}, {}, IAuthRequisites>, res: Response) => {
     try {
       const verified = await verifyRequisites(req.body);

       if (verified) {
         res.redirect(`/${process.env.ADMIN_PATH}`);
       } else {
         res.redirect(`/${process.env.ADMIN_PATH}/auth/login`);
       }
     } catch (e) {
       throwServerError(res, e);
     }
   }
);
 
     export const validateSession = (
       req: Request,
       res: Response,
       next: NextFunction
     ) => {
       if (req.path.includes("/login") || req.path.includes("/authenticate")) {
         next();
         return;
       }

       if (req.session?.username) {
         next();
       } else {
         res.redirect(`/${process.env.ADMIN_PATH}/auth/login`);
       }
     }; 
