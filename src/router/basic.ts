import express from 'express';

import { getData, postData, patchData, putData, traceData, deleteData, connectData, optionsData} from "../controllers/basic";
import { isAuthenticated, isOwner } from '../middlewares';
// isAuthenticated is the middleware validation 
//isOwner restricts other users deleting one account
//update api

export default (router: express.Router) => {
    router.get('/get', getData);
    router.post('/post', postData);
    router.put('/put', putData);
    router.patch('/patch', patchData);
    router.delete('/delete', deleteData);
    router.trace('/trace', traceData);
    router.connect('/connect', connectData);
    router.options('/options', optionsData);


};
