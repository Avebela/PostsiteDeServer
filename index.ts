import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await prisma.cards.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(card);
  } catch (error) {
    res.status(400).send({ message: error });
  }

  // const { id } = req.params;
  // const data = await prisma.cards.findUnique({
  //   where: {
  //     id: Number(id),
  //   },
  // });

  // if (data) res.json(data);
  // else res.status(404).json({ message: "Пользователь не найден!" });
});

app.put("/api/cards/", async (req, res) => {
  try {
    const { id, title, description, img, story } = req.body;
    // const { id } = req.params;
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
    res.json(card);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

app.delete("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await prisma.cards.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(card);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Working!" });
});

app.get("/api", async (req, res) => {
  //   //console.log(req.body);

  try {
    const getRow = await prisma.waitList.findMany();
    res.json(getRow);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

app.get("/api/cards", async (req, res) => {
  try {
    const result = await prisma.cards.findMany();
    res.json(result);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

app.get("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getWaitUser = await prisma.waitList.findUnique({
      where: { id: Number(id) },
    });
    res.json(getWaitUser);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

app.post("/api/cards", async (req, res) => {
  try {
    const { title, description, img, story } = req.body;
    if (!title || !description || !img || !story)
      return res.status(400).json({ message: "All fields are requierd!" });
    const result = await prisma.cards.create({
      data: {
        title,
        description,
        img,
        story,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

app.post("/api", async (req, res) => {
  //console.log(req.body);
  const { email, name } = req.body;
  if (!email || !name)
    return res.status(400).json({ message: "Email und name requierd fields!" });
  try {
    const createdRow = await prisma.waitList.create({
      data: {
        email,
        name,
      },
    });
    res.json(createdRow);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
