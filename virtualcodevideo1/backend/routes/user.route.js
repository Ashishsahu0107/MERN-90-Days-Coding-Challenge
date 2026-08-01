import express from 'express'
import { Router } from 'express'
import { createUser, deleteUser, home, readAllUser, update, updateUser } from '../controllers/user.controller.js';

const userRouter=express(Router())

userRouter.get("/", home)
userRouter.post("/create", createUser);
userRouter.get("/read", readAllUser);
userRouter.put("/update/:id", updateUser);
userRouter.put("/update", update);
userRouter.delete("/delete", deleteUser);


export default userRouter; 