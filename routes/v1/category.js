import express from "express";
import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import CategoryValidator from "../../validators/CategoryValidator.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();


// create category 
router.post("/", async (req, res) => {
    let category;
  
    try {
      category = CategoryValidator.parse(req.body);
    } catch (error) {
      return res.status(400).json({ errors: error.issues });
    }
  

  const entry = await prisma.category.create({
    data: {
      name: category.name,
      user_id: category.user_id,
      },
      
    });
  
    res.json(entry);
  });


// delete category
  router.delete("/:id", async (req, res, next) => {
    const category = parseInt(req.params.id);
  
    await prisma.category.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
  
    res.status(204).json({ message: "Category deleted" });
  });


// edit a category
router.patch("/:id", async (req, res, next) => {
  let category;
  try {
    category = await prisma.category.update({
      where: {
        id: parseInt(req.params.id),
      },

      data: {
        name: req.body.name,
      },
     
    });
  } catch (error) {
    return next(createError(404, "Unmodified category "));
  }

  res.json(category);
});


// get category with his id
  router.get("/:id", async (req, res) => {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
  
    if (!category) {
      return next(createError(404, "Category not found"));
    }
  
    res.json(category);
  });
 
// list category
    router.get("/", async (req, res) => {
      // asc ou desc
      const sortOrderQuery = req.query.sortOrder;
      const sortByQuery = req.query.sortBy;
    
      // sorting
      let orderBy = [];
      if (sortOrderQuery) {
        orderBy.push({
          [sortByQuery]: sortOrderQuery,
        });
      }

    
      // paging
      let skip = 0;
      if (req.query.skip) {
        skip = parseInt(req.query.skip);
      }
    
      let take = 12;
      if (req.query.take) {
        take = parseInt(req.query.take);
      }
    
      const category = await prisma.category.findMany({
        orderBy,
        skip,
        take,
      });
    
      res.json(category);
    });
  
 
  export default router;