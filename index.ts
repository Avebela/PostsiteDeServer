import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
export const prisma = new PrismaClient();

const app = express();
const PORT = 5000;
const router = require("./routers/index");

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Working!" });
});

const server = app.listen(PORT, () => {
  //console.log(`Example app listening on port ${PORT}`);
  console.log(PORT);
});

// ,
// "prisma": {
//   "index": "ts-node --esm prisma/seed.ts"
// }
//https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgresql
