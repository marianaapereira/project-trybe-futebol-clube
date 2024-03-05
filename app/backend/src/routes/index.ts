import { Router } from 'express';
import loginRouter from './login.router';
import teamRouter from './team.router';
import matchRouter from './match.router';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);

export default router;
