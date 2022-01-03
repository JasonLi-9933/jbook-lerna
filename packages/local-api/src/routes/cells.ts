import express from "express";
import fs from "fs/promises";
import path from "path";
import {introText, sampleCode} from '../default-content';

interface Cell {
  id: string;
  content: string;
  type: "code" | "text";
}

const randomId = (): string => {
  return Math.random().toString(36).substring(2, 7);
};

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  const fullPath = path.join(dir, filename);

  router.use(express.json()); // make req.body accessible

  const defaultCells: Cell[] = [];
  const introTextCell: Cell = {
    id: randomId(),
    type: "text",
    content: introText,
  };
  const sampleCodeCell: Cell = {
    id: randomId(),
    type: "code",
    content: sampleCode
  }
  defaultCells.push(introTextCell);
  defaultCells.push(sampleCodeCell)

  router.get("/cells", async (req, res) => {
    // read the file
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (err: any) {
      if (err.code === "ENOENT") {
        // no file found
        // create a file and add default content
        await fs.writeFile(fullPath, JSON.stringify(defaultCells), "utf-8");
        res.send(defaultCells);
      } else {
        throw err;
      }
    }

    // parse a list of cells out of it
    // send list of cells back to browser
  });

  router.post("/cells", async (req, res) => {
    // take the list of cells from request obj
    const { cells }: { cells: Cell[] } = req.body;
    // serialize them
    // write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
