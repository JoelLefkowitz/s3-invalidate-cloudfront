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
              description: "The bucket name",
              demandOption: true,
            })
            .option("region", {
              type: "string",
              description: "Set the AWS region",
              alias: "r",
              default: "us-east-1",
            })
            .option("dry-run", {
              type: "boolean",
              description: "Don't make any changes",
              alias: "d",
              default: false,
            }),
      )
      .help()
      .version()
      .alias("help", "h")
      .alias("version", "v")
      .wrap(Math.min(yargs().terminalWidth(), 120))
      .parseSync(),
  );
