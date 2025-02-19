import { NextFunction, Request, Response } from "express";
import { customErrorMap } from "@/utils/zod";
import { z, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

z.setErrorMap(customErrorMap);

const ValidationMiddleware = (schema: z.ZodObject<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (e) {
            if (e instanceof ZodError) {
                const defaultError = e.errors[0].message;
                const errorMessages = e.errors.map((issue) => {
                    let obj: any = {};
                    const index = issue.path[0] as any;
                    obj[index] = issue.message;
                    return obj;
                });
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: defaultError,
                    details: errorMessages,
                })
            } else {
                res.status(500).json({
                    message: "Internal server error !",
                });
            }
        }
    }
};

export default ValidationMiddleware;