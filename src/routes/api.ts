import express from "express";
const router = express.Router();

// Controllers
import UserController from "@/controllers/Api/Admin/User/UserController";

// Requests
import UserRequest from "@/requests/Api/Admin/UserRequest";

// Middlewares
import ValidationMiddleware from "@/middlewares/ValidationMiddleware";

router.get('/user', UserController.index);
router.get('/user/show/:id', UserController.index);
router.post('/user/store', ValidationMiddleware(UserRequest.store()), UserController.store);
router.get('/user/destory', UserController.index);
router.get('/user/restore/:id', UserController.index);
router.get('/user/force-delete/:id', UserController.index);
router.get('/user/clear-trash', UserController.index);


export default router;