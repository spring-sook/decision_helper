import { Router } from 'express';
import { createUser, login, refresh, logout, findAccount, pwFind, verifyResetToken } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/signup', createUser);
router.post('/login', login);
router.post('/refresh-token', refresh);
router.post('/logout', logout);
router.post('/find-account', findAccount);
router.post('/pwfind', pwFind);
router.get('/verify-reset-token', verifyResetToken);

export default router;
