import { Command } from "commander";
import { serve } from "local-api";
import path from "path";
export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action((filename = "notebook.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(+options.port, path.basename(filename), dir);
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
