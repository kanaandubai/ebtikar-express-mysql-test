import express from 'express';
import { signup, signin,getProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import {validateSignin,validateSignup} from '../middleware/validationMiddleware'

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignin, signin);
router.get('/profile', authenticateToken, getProfile);

export default router;
