import express from "express";
const router = express.Router();

// Controllers
import UserController from "@/controllers/Api/Admin/User/UserController";

// Requests
import UserRequest from "@/requests/Api/Admin/UserRequest";

// Middlewares
import ValidationMiddleware from "@/middlewares/ValidationMiddleware";

router.get('/user', UserController.index);
router.get('/user/show/:id', UserController.show);
router.post('/user/store', ValidationMiddleware(UserRequest.store()), UserController.store);
router.post('/user/update/:id', ValidationMiddleware(UserRequest.update()), UserController.update);
router.post('/user/destroy/:id', UserController.destroy);
router.get('/user/trash', UserController.trash);
router.get('/user/restore/:id', UserController.restore);
router.post('/user/force-delete/:id', UserController.forceDelete);
router.post('/user/clear-trash', UserController.clearTrash);

router.get('*', (_, res) => {
    res.status(404).json({
        message: "This route does not exist or you are not sending a parameter correctly !",
    });
});

export default router;