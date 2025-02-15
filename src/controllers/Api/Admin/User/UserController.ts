import User from "@/models/User";
import { Request, Response } from "express";

export default class UserController {
    static index (req: Request, res: Response) {
        res.json({
            message: "hello mahdi :)",
        })
    }

    static show (req: Request, res: Response) {
        res.json({
            param: req.params.id,
        })
    }

    static async store (req: Request, res: Response) {
        try {
            // const user = await User.create(req.body);
            res.status(200).json({
                message: "user created successfully !",
                // user: user,
            });
        } catch (e) {
            res.status(500).json({
                message: "error : " + e,
            });
        }
    }

    static update (req: Request, res: Response) {
        res.json({
            message: "stored item !"
        })
    }

    static restore (req: Request, res: Response) {
        res.json({
            message: "stored item !"
        })
    }

    static forceDelete (req: Request, res: Response) {
        res.json({
            message: "stored item !"
        })
    }
}