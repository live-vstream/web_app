import { Router, Response, Request } from 'express';
import {db} from "../dbconnect"

const streamRouter: Router = Router();

streamRouter.post('/', (request: Request, response: Response) => {

});



export { streamRouter }
