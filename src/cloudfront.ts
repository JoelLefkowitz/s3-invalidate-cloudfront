import {
  CloudFrontClient,
  CreateInvalidationCommand,
  ListDistributionsCommand,
} from "@aws-sdk/client-cloudfront";
import { assoc } from "ramda";

export interface Cache {
  id: string;
  path: string;
}

const client = new CloudFrontClient();

export const lookup = async (
  bucket: string,
  region: string,
): Promise<Cache[]> => {
  const { DistributionList } = await client.send(
    new ListDistributionsCommand(),
  );

  const distributions = DistributionList?.Items ?? [];

  return distributions.flatMap(
    ({ Id, Origins, CacheBehaviors, DefaultCacheBehavior }) => {
      const domain = `${bucket}.s3.${region}.amazonaws.com`;

      const origins = Origins?.Items ?? [];
      const caches = CacheBehaviors?.Items ?? [];

      if (DefaultCacheBehavior) {
        caches.push(assoc("PathPattern", "", DefaultCacheBehavior));
      }

      const matches = origins.reduce<string[]>(
        (acc, { Id, DomainName }) =>
          Id && DomainName === domain ? acc.concat(Id) : acc,
        [],
      );

      return caches.reduce<Cache[]>(
        (acc, { TargetOriginId, PathPattern }) =>
          Id && matches.includes(TargetOriginId ?? "")
            ? acc.concat({ id: Id, path: PathPattern ? PathPattern : "/*" })
            : acc,
        [],
      );
    },
  );
};

export const invalidate = async ({ id, path }: Cache): Promise<void> => {
  await client.send(
    new CreateInvalidationCommand({
      DistributionId: id,
      InvalidationBatch: {
        CallerReference: new Date().toISOString(),
        Paths: {
          Quantity: 1,
          Items: [path],
        },
      },
    }),
  );
};
