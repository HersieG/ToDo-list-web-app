import express from "express";
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
  // Handle user registration logic here
  const { name, email, password } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  // hash the password before saving to the database

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data:{
        name: name,
        email: email,
        password: hashedPassword
    }
  })
  return res.status(201).json({
     status: "success", 
     data: {
        user:{
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    });
};



export { register };
