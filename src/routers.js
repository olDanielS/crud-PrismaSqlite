import {Router} from 'express';

import UserController from './Controllers/UserController';
import PostController from './Controllers/PostController';

const router = Router();

router.post("/user", UserController.createUser)
router.get("/users", UserController.findUsers)
router.get("/user/:email", UserController.findUserByEmail)
router.put("/user/:email", UserController.updateUser)
router.delete("/user/:email", UserController.removeUser)
               
router.post("/post/user/:email", PostController.createPost)
router.post("/posts", PostController.findAllPosts)
router.put("/post/:id", PostController.updatePost)

export {router}