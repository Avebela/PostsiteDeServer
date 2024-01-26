//const { prisma } = require("../prisma/seed");
const { prisma } = require("../index.ts");
//import { prisma } from "../index.ts";
//import { prisma } from "../index.ts";
//module.exports =
class mailController {
  async getAll(req, res) {
    try {
      const result = await prisma.waitList.findMany();
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
      const card = await prisma.waitList.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.json(card);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req, res) {
    try {
      const { email, name } = req.body;
      if (!email || !name)
        return res.status(400).json({ message: "All fields are requierd!" });
      const result = await prisma.waitList.create({
        data: {
          email,
          name,
        },
      });
      res.json(result);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const { id, email, name } = req.body;
      if (!id) {
        throw new Error("id не указан");
      }
      const card = await prisma.waitList.update({
        where: {
          id: Number(id),
        },
        data: {
          email,
          name,
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
      const card = await prisma.waitList.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json(card);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}
module.exports = new mailController();
