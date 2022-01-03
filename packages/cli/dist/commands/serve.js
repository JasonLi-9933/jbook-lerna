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
exports.serveCommand = void 0;
const commander_1 = require("commander");
const local_api_1 = require("@jbook-by-jl/local-api");
const path_1 = __importDefault(require("path"));
const isProduction = process.env.NODE_ENV === "production";
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "notebook.js", options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        yield (0, local_api_1.serve)(+options.port, path_1.default.basename(filename), dir, !isProduction);
        console.log(`Opened ${filename}. Please navigate to http://localhost:${options.port} to edit the file.`);
    }
    catch (err) {
        if (err.code === "EADDRINUSE") {
            console.log(`Port is in use. Try a different port number`);
        }
        else {
            console.log("Oops! Something went wrong: ", err.message);
        }
    }
}));
/**
 * commander will be taking care of every possible combination of command
 * such as
 * 1. serve a.js
 * 2. serve a.js -p 3000
 * 3. serve a.js --port 3000
 * 4. serve a.js --port=3000
 * 5. serve -p 3000 a.js
 * etc
 */
