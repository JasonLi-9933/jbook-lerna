"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const default_content_1 = require("../default-content");
const randomId = () => {
    return Math.random().toString(36).substring(2, 7);
};
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    const fullPath = path_1.default.join(dir, filename);
    router.use(express_1.default.json()); // make req.body accessible
    const defaultCells = [];
    const introTextCell = {
        id: randomId(),
        type: "text",
        content: default_content_1.introText,
    };
    const sampleCodeCell = {
        id: randomId(),
        type: "code",
        content: default_content_1.sampleCode
    };
    defaultCells.push(introTextCell);
    defaultCells.push(sampleCodeCell);
    router.get("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // read the file
        try {
            const result = yield promises_1.default.readFile(fullPath, { encoding: "utf-8" });
            res.send(JSON.parse(result));
        }
        catch (err) {
            if (err.code === "ENOENT") {
                // no file found
                // create a file and add default content
                yield promises_1.default.writeFile(fullPath, JSON.stringify(defaultCells), "utf-8");
                res.send(defaultCells);
            }
            else {
                throw err;
            }
        }
        // parse a list of cells out of it
        // send list of cells back to browser
    }));
    router.post("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // take the list of cells from request obj
        const { cells } = req.body;
        // serialize them
        // write the cells into the file
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), "utf-8");
        res.send({ status: "ok" });
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
