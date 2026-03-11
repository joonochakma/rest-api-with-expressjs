import express from 'express';

import { login, register, logout } from '../controllers/authentication';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post('/auth/logout', isAuthenticated, logout);
    router.get('/auth/me', isAuthenticated, (req: any, res) => {
        res.json({ user: { id: req.identity.id, email: req.identity.email, username: req.identity.username } });
    });
};