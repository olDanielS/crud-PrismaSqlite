import {Router} from 'express';

import UserController from './Controllers/UserController';

const router = Router();

router.post("/user", UserController.createUser)
router.get("/user/:email", UserController.findUserByEmail)
router.get("/users", UserController.findUsers)
                                            
export {router}