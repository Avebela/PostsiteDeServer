//const { prisma } = require("../prisma/seed");
const { prisma } = require("../index.ts");
//import { prisma } from "../index.ts";
//import { prisma } from "../index.ts";
//module.exports =
class typeController {
  async getAll(req, res) {
    try {
      const result = await prisma.cards.findMany();
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
      const card = await prisma.cards.findUnique({
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
    //   try {
    //     const { title, description, img, story } = req.body;
    //     if (!title || !description || !img || !story)
    //       return res.status(400).json({ message: "All fields are requierd!" });
    //     const result = await prisma.cards.create({
    //       data: {
    //         title,
    //         description,
    //         img,
    //         story,
    //       },
    //     });
    //     res.json(result);
    //   } catch (e) {
    //     res.status(500).json(e.message);
    //   }
  }

  async update(req, res) {
    try {
      const { id, title, description, img, story } = req.body;
      if (!id) {
        throw new Error("id не указан");
      }
      const card = await prisma.cards.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          description,
          img,
          story,
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
      const card = await prisma.cards.delete({
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
module.exports = new typeController();
