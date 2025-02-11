import express from 'express';
const router = express.Router();

// Controllers

import UserController from '../Controllers/Api/Admin/User/UserController';

// middleware
router.use((req, res, next) => {
    next();
});

router.get('/user', UserController.index);
router.get('/user/show/:id', UserController.index);
router.get('/user/store', UserController.index);
router.get('/user/destory', UserController.index);
router.get('/user/restore/:id', UserController.index);
router.get('/user/force-delete/:id', UserController.index);
router.get('/user/clear-trash', UserController.index);


export default router;