import express from 'express';

import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from '../middlewares';
// isAuthenticated is the middleware validation 
//isOwner restricts other users deleting one account
//update api

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id',isAuthenticated, isOwner, deleteUser);
    router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};
