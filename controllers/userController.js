const { prisma } = require("../index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { auth } = require("../middleware/auth.js");

//const { prisma } = require("../index.ts");
//import { prisma } from "../index.ts";
//import { prisma } from "../index.ts";
//module.exports =
class userController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "All fields are requierd!" });

      //res.send("login");
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      const isPasswordCorrect =
        user && (await bcrypt.compare(password, user.password)) && jwt;
      const secret = process.env.JWT_SECRET;
      if (user && isPasswordCorrect && secret) {
        res.status(200).json({
          id: user.id,
          email: user.email,
          name: user.name,
          token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        });
      } else
        return res
          .status(400)
          .json({ message: "Неверно введен логин или пароль" });
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      if (!email || !name || !password) {
        return res.status(400).json({ message: "All fields are requierd!" });
      }
      const registeredUser = await prisma.user.findFirst({
        where: { email },
      });
      if (registeredUser) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует!" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      const secret = process.env.JWT_SECRET;
      if (user && secret) {
        res.status(201).json({
          id: user.id,
          email: user.email,
          name,
          token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        });
      } else {
        return res
          .status(400)
          .json({ message: "Не удалось создать пользователя!" });
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async current(req, res, next) {
    try {
      return res.status(200).json(req.user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const result = await prisma.user.findMany();
      // order: [["id", "ASC"]],
      res.json(result);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("id не указан");
        // res.status(400).json({ message: "id не указан" });
      }
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password)
        return res.status(400).json({ message: "All fields are requierd!" });
      const result = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      res.json(result);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const { id, name, email, password } = req.body;
      if (!id) {
        throw new Error("id не указан");
      }
      const card = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          email,
          password,
        },
      });
      return res.json(card);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("id не указан");
      }
      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}
module.exports = new userController();
