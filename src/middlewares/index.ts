import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from 'db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessioToken = req.cookies['JOONO-AUTH'];
        if (!sessioToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessioToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}