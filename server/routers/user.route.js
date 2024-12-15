const { Router } = require("express");
const {
  Signup,
  Login,
  GetUser,
  deleteUser,
  verifyUser,
  getAdmins,
  verifyAdmin,
} = require("../controllers/user.controller");

const { decode } = require("../middleware/decodeJwt"); 
const { isSuperAdmin } = require("../middleware/admin"); 

const userRouter = Router();

userRouter.post("/signup", Signup); 
userRouter.post("/login", Login);    
userRouter.get("/", GetUser);       
userRouter.delete("/:id", decode, isSuperAdmin, deleteUser);
userRouter.get("/verify/:token/:otp", verifyUser); 
userRouter.get("/all-admin", decode, isSuperAdmin, getAdmins); 
userRouter.patch("/verifyadmin/:adminId", decode, isSuperAdmin, verifyAdmin); 

module.exports = userRouter;
