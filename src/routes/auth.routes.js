import { Router } from 'express'
import { login, register, logout, profile, verifyToken, sendPasswordResetEmail, resetPassword,getUsers,deleteUser } from '../controllers/auth.controller.js'
import { authRequired, isAdministrador, isPropietario } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router()

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile', authRequired, profile);

router.get('/users', [authRequired, isPropietario], getUsers);


router.delete("/users/:id", deleteUser);

router.post('/send-password-reset-email', sendPasswordResetEmail);
router.post('/reset-password/:token', resetPassword);

export default router;