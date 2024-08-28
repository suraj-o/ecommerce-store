import express from "express";
import { deleteUser, getAllUers, getMe, newUser, signin } from "../controllers/user.js";
import bodyParser from "body-parser";
import { singleUpload } from "../middleware/multer.js";
import isAdmin from "../utils/feature.js";


const app = express();


app.post("/sign-up",singleUpload,newUser)
app.post("/sign-in",signin)
app.get("/all-users",isAdmin,getAllUers)
app.route("/:id").get(getMe).
                 delete(isAdmin,deleteUser)


export default app