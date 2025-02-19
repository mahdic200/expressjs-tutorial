import { Op } from "sequelize";
import sequelize from "@/db";
import User from "@/models/User";
import { initPageParam, paginateMetaData } from "@/utils/pagination";
import { Request, Response } from "express";

const paginationSize = 15;
export default class UserController {
    static guard = ['first_name', 'last_name', 'phone'];
    static pruneReq = (req: Request) => {
        let result: any = {};
        UserController.guard.forEach((field) => {
            if (req.body[field] != undefined)
            result[field] = req.body[field];
        });
        return result;
    }

    static async index (req: Request, res: Response) {
        try {
            const query = req.query;
            const count = await User.count();
            let page = initPageParam(query.page);
            const metaData = paginateMetaData({ page: page, count: count, size: paginationSize });
            const users = await User.findAll({
                limit: paginationSize,
                offset: metaData.offset,
            });
            res.status(200).json({
                data: users,
                metaData: metaData,
            });
        } catch (e) {
            res.status(500).json({
                message: "! خطای سرور ، مشکلی پیش آمده است",
            });
        }
    }

    static async show (req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findOne({ where: { id: id }});
        if (!user) {
            res.status(404).json({
                message: "! موردی یافت نشد",
            });
            return;
        }
        res.json({
            data: user,
        })
    }

    static async store (req: Request, res: Response) {
        const body = UserController.pruneReq(req);
        const existingUser = await User.findOne({ where: { phone: body.phone }});
        if (existingUser) {
            res.status(400).json({
                message: "این شماره تلفن قبلا ثبت شده است",
                details: [
                    {
                        phone: "این شماره تلفن قبلا ثبت شده است"
                    },
                ],
            });
            return;
        }
        const transaction = await sequelize.transaction();
        try {
            const user = await User.create(body, { transaction });
            await transaction.commit();
            res.status(200).json({
                message: "! کاربر با موفقیت ایجاد شد",
                user: user,
            });
        } catch (e) {
            await transaction.rollback();
            res.status(500).json({
                message: "! خطای سرور ، مشکلی پیش آمده است",
            });
        }
    }

    static async update (req: Request, res: Response) {
        const { id } = req.params;
        const body = UserController.pruneReq(req);
        if (body.phone) {const existingUser = await User.findOne({ where: { id: { [Op.ne]: id }, phone: body.phone }});
        if (existingUser) {
            res.status(400).json({
                message: "این شماره تلفن قبلا ثبت شده است",
                details: [
                    {
                        phone: "این شماره تلفن قبلا ثبت شده است"
                    },
                ],
            });
            return;
        }}
        const transaction = await sequelize.transaction();
        try {
            await User.update(body, { where: { id: id }, transaction: transaction });
            await transaction.commit();
            res.status(200).json({
                message: "! کاربر با موفقیت ویرایش شد",
            });
        } catch (e) {
            await transaction.rollback();
            res.status(500).json({
                message: "! خطای سرور ، مشکلی پیش آمده است",
            });
        }
    }

    static async destroy (req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findOne({ where: { id: id }});
        if (!user) {
            res.status(404).json({
                message: "! موردی یافت نشد",
            });
            return;
        }
        try {
            await user.destroy();
            res.status(200).json({
                message: "! کاربر با موفقیت به سطل زباله انتقال یافت",
            });
        } catch (e) {
            res.status(500).json({
                message: "! خطای سرور ، مشکلی پیش آمده است"
            });
        }
    }

    static async restore (req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findOne({ where: { id: id, deleted_at: { [Op.ne]: null, } }, paranoid: false, });
        if (!user) {
            res.status(404).json({
                message: "! موردی یافت نشد",
            });
            return;
        }
        try {
            user.restore();
            res.status(200).json({
                message: "! کاربر از سطل زباله بازیابی شد",
            });
        } catch (e) {
            res.status(500).json({
                message: "! خطای سرور ، مشکلی پیش آمده است",
            });
        }
    }

    static async trash (req: Request, res: Response) {
        try {
            const query = req.query;
            const { count } = await User.findAndCountAll({
                where: { deleted_at: { [Op.ne]: null, } },
                paranoid: false,
            });
            let page = initPageParam(query.page);
            const metaData = paginateMetaData({ page: page, count: count, size: paginationSize });
            const users = await User.findAll({
                where: { deleted_at: { [Op.ne]: null, } },
                limit: paginationSize,
                offset: metaData.offset,
                paranoid: false,
            });
            res.status(200).json({
                data: users,
                metaData: metaData,
            });
        } catch (e) {
            res.status(500).json({
                message: "! خطای سرور ، مشکلی پیش آمده است",
            });
        }
    }

    static async forceDelete (req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findOne({ where: { id: id, deleted_at: { [Op.ne]: null, } }, paranoid: false, });
        if (!user) {
            res.status(404).json({
                message: "! موردی یافت نشد",
            });
            return;
        }
        try {
            await user.destroy({ force: true });
            res.status(200).json({
                message: "! کاربر برای همیشه حذف شد",
            });
        } catch (e) {
            res.status(500).json({
                message: "! خطای سرور ، مشکلی پیش آمده است",
            });
        }
    }

    static async clearTrash (req: Request, res: Response) {
        const users = await User.findAll({ where: { deleted_at: { [Op.ne]: null, } }, paranoid: false, });
        if (!users.length) {
            res.status(200).json({
                message: "! چیزی برای خالی کرد نیست",
            })
            return;
        }
        try {
            users.forEach(async (user) => {
                await user.destroy({ force: true, });
            })
            res.status(200).json({
                message: "! سطل زباله خالی شد",
            });
        } catch (e) {
            res.status(500).json({
                message: "! خطای سرور ، مشکلی پیش آمده است",
            });
        }
    }

}