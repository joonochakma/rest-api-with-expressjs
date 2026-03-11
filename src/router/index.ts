import express from 'express';

import authentication from './authentication';
import users from "./users";
import basic from "./basic";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    basic(router);
    users(router);

    return router;
}