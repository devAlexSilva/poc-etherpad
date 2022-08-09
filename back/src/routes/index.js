import express from 'express'
import { router } from './createUser.js'
import { login } from './login.js'
import { user } from './users.js'
import { pad } from './pad.js'

const routes = express.Router();

routes.use('/', router);
routes.use('/', login);
routes.use('/user', user);
routes.use('/pad', pad);


export { routes }