#!/usr/bin/env node
import { cli } from "./cli";
import { hideBin } from "yargs/helpers";
import { invalidate, lookup } from "./cloudfront";

const { name, region, dry } = cli(hideBin(process.argv));

lookup(name, region)
  .then((caches) => {
    if (caches.length === 0) {
      console.log(`No caches found for bucket "${name}" in region "${region}"`);
    }

    return Promise.all(
      caches.map(async ({ id, path }) => {
        if (dry) {
          console.log(`Dry run: Would invalidate "${id}" at path "${path}"`);
        } else {
          await invalidate({ id, path });
          console.log(`Invalidated "${id}" at path "${path}"`);
        }
      }),
    );
  })
  .catch(console.error);
