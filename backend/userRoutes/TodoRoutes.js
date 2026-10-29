import express from "express";
import userauth from "../middleware/userauth.js";
import { delete_, get_, post_, put_ } from "../controllers/todocontroller.js";

const todorouter = express.Router();

todorouter.get("/", userauth, get_);
todorouter.post("/", userauth, post_);
todorouter.put("/:id", userauth, put_);
todorouter.delete("/:id", userauth, delete_);

export default todorouter;
