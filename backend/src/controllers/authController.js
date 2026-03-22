import express from "express";
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

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
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id, res);

  return res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Genereate JWT token
  const token = generateToken(user.id, res);

  return res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire immediately
  });
  return res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

export { register, login, logout };
