import * as userController from '../controllers/user.controller.js';
import { Router } from 'express';
import { body } from 'express-validator';

const router = Router();

router.post('/register',
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    userController.createUserController);

router.post('/login',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    userController.loginUserController);


export default router;