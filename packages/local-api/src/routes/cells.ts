import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "code" | "text";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  const fullPath = path.join(dir, filename);

	router.use(express.json()); // make req.body accessible

  router.get("/cells", async (req, res) => {
    // read the file
		try {
			const result = await fs.readFile(fullPath, {encoding: "utf-8"});
			res.send(JSON.parse(result));
		} catch (err: any) {
			if (err.code === 'ENOENT') {
				// no file found
				// create a file and add default content
				await fs.writeFile(fullPath, '[]', 'utf-8');
				res.send([]);
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
