import { applySpec, prop } from "ramda";
import yargs from "yargs";

export interface CLI {
  name: string;
  region: string;
  dry: boolean;
}

export const cli = (argv: string[]) =>
  applySpec<CLI>({
    name: prop("name"),
    region: prop("region"),
    dry: prop("dry-run"),
  })(
    yargs(argv)
      .command(
        "$0 <name>",
        "Invalidate CloudFront caches for a bucket.",
        (yargs) =>
          yargs
            .positional("name", {
              type: "string",
              demandOption: true,
            })
            .option("region", {
              type: "string",
              alias: "r",
              default: "us-east-1",
            })
            .option("dry-run", {
              type: "boolean",
              alias: "d",
              default: false,
            }),
      )
      .help()
      .version()
      .alias("help", "h")
      .alias("version", "v")
      .parseSync(),
  );
