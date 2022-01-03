import { Command } from "commander";
import { serve } from "@jbook-by-jl/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(+options.port, path.basename(filename), dir, !isProduction);
      console.log(
        `Opened ${filename}. Please navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err: any) {
      if (err.code === "EADDRINUSE") {
        console.log(`Port is in use. Try a different port number`);
      } else {
        console.log("Oops! Something went wrong: ", err.message);
      }
    }
  });
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
