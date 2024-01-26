const { prisma } = require("../index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { auth } = require("../middleware/auth.js");

class commentController {
  async getAll(req, res) {
    try {
      const comments = await prisma.comment.findMany();

      res.json(comments);
    } catch (e) {
      res.status(500).json({ message: "Не удалось получить все комментарии" });
    }
  }
  async getAllforUser(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new Error("userid не указан");
        // res.status(400).json({ message: "id не указан" });
      }
      const comments = await prisma.comment.findMany({
        where: {
          userId,
        },
      });

      res.json(comments);
    } catch (e) {
      res
        .status(500)
        .json({ message: "!!Не удалось получить комментарии пользователя" });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("!id не указан!");
        // res.status(400).json({ message: "id не указан" });
      }
      const comment = await prisma.comment.findUnique({
        where: {
          id,
        },
      });
      res.status(200).json(comment);
    } catch (e) {
      res.status(500).json({ message: "Не удалось получить комментарий" });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      if (!data.body) {
        return res
          .status(400)
          .json({ message: "Пожалуйста, напишите комментарий!" });
      }

      const comment = await prisma.comment.create({
        data: {
          ...data,
          userId: req.user.id,
        },
      });

      return res.status(201).json(comment);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const data = req.body;
      const id = data.id;
      if (!id) {
        throw new Error("id не указан");
      }
      await prisma.comment.update({
        where: {
          id,
        },
        data,
      });
      return res.json({ message: "OK!" });
    } catch (e) {
      res.status(500).json({ message: "Не удалось изменить комментарий" });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        throw new Error("id не указан");
      }
      await prisma.comment.delete({
        where: {
          id,
        },
      });
      return res.json({ message: "OK!" });
    } catch (e) {
      res.status(500).json({ message: "Не удалось удалить комментарий" });
    }
  }
}
module.exports = new commentController();
