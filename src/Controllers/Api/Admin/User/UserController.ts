import { Request, Response } from "express"

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

    static store (req: Request, res: Response) {
        res.json({
            message: "stored item !"
        })
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