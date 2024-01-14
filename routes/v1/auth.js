import express from "express";

import jwt from "jsonwebtoken";

import UserValidator from "../../validators/UserValidator.js";

import UserLoginValidator from "../../validators/UserLoginValidator.js";

import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const prisma = new PrismaClient();

// create a account
router.post("/register", async (req, res) => {
  let user;

  try {
    user = UserValidator.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.issues });
  }

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(user.password, SALT);

  const entry = await prisma.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      picture: user.picture,
    },
  });

  res.json(entry);
});

// login into account
router.post("/login", async (req, res) => {
  let loginData;

  try {
    loginData = UserLoginValidator.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.issues });
  }


  const userLogin = await prisma.user.findFirst({
    where: {
      email: loginData.email,
      password: loginData.password,
    }, 

  });


  res.json(userLogin);
});


// delete an account
router.delete("/:id", async (req, res, next) => {
  const deleteAccount = parseInt(req.params.id);

  await prisma.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json({ message: "Accound deleted" });
});


// edit an account
router.patch("/:id", async (req, res, next) => {
  let editAccount;
  try {
    editAccount = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },

      data: {
        email: req.body.email,
        password: req.body.password,
        picture: req.body.picture,

      },
     
    });
  } catch (error) {
    res.status(200).json({ message: "Account couldn't be edited" });
  }

  res.json(editAccount);
});

// get account with his id
router.get("/:id", async (req, res) => {
  const findAccount = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!findAccount) {
    return next(createError(404, "Account not found"));
  }

  res.json(findAccount);
});


export default router;
