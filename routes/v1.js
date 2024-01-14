import express from "express";

import SnippetRouter from "./v1/snippet.js";
import AuthRouter from "./v1/auth.js";
import CategoryRouter from "./v1/category.js";



const router = express.Router();

router.use("/snippet", SnippetRouter);
router.use("/auth", AuthRouter);
router.use("/category", CategoryRouter);


export default router;
