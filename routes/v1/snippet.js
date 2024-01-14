import express from "express";
import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import SnippetValidator from "../../validators/SnippetValidator.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

// create snippet
router.post("/", async (req, res) => {
  
    let snippet;
  
    try {
      snippet = SnippetValidator.parse(req.body);
    } catch (error) {
      return res.status(400).json({ errors: error.issues });
    }
  
   
  const { title, content, language, created_at, categoryId } = snippet;

  const entry = await prisma.snippet.create({
    data: {
      title: title,
      content: content,
      language: language,
      created_at: created_at,
      category_id: snippet.category_id,
      user_id: snippet.user_id,
      },
      
    });
  
    res.json(entry);
  });


// get snippet with his id
  router.get("/:id", async (req, res) => {
    const snippet = await prisma.snippet.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
  
    if (!snippet) {
      return next(createError(404, "Snippet not found"));
    }
  
    res.json(snippet);
  });
 
  
// delete snippet
  router.delete("/:id", async (req, res, next) => {
    const snippet = parseInt(req.params.id);
  
    await prisma.snippet.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(204).send("Snippet deleted");
  });


// edit a snippet
router.patch("/:id", async (req, res, next) => {
  let snippet;
  try {
    snippet = await prisma.snippet.update({
      where: {
        id: parseInt(req.params.id),
      },

      data: {
        title:  req.body.title,
        content:  req.body.content,
        language:  req.body.language,
        created_at:  req.body.created_at,
      },
     
    });
  } catch (error) {
    return next(createError(404, "Snippet couldn't be edited"));
  }

  res.json(snippet);
});


export default router;