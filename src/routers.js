import {Router} from 'express';

import UserController from './Controllers/UserController';

const router = Router();

router.post("/user", UserController.createUser)
router.get("/users", UserController.findUsers)
router.get("/user/:email", UserController.findUserByEmail)

router.put("/user/:email", UserController.updateUser)
router.delete("/user/:email", UserController.removeUser)
                                            
export {router}