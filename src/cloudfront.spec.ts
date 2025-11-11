import { describe, expect, it, vi } from "vitest";
import { lookup } from "./cloudfront";

const stub = vi.hoisted(() => vi.fn());

vi.mock("@aws-sdk/client-cloudfront", () => ({
  CreateInvalidationCommand: class {},
  ListDistributionsCommand: class {},
  CloudFrontClient: class {
    send = stub;
  },
}));

describe("lookup", () => {
  it("finds distributions with a matching origin", async () => {
    const id = "distribution";

    stub.mockResolvedValueOnce({
      DistributionList: {
        Items: [
          {
            Id: id,
            Origins: {
              Items: [
                {
                  Id: "id",
                  DomainName: "bucket.s3.us-east-1.amazonaws.com",
                },
                {
                  Id: "_",
                  DomainName: "bucket.s3.us-east-2.amazonaws.com",
                },
              ],
            },
            DefaultCacheBehavior: {
              TargetOriginId: "id",
            },
            CacheBehaviors: {
              Items: [
                {
                  PathPattern: "/path/*",
                  TargetOriginId: "id",
                },
                {
                  PathPattern: "_",
                  TargetOriginId: "_",
                },
              ],
            },
          },
        ],
      },
    });

    const response = await lookup("bucket", "us-east-1");
    expect(response).toEqual(["/path/*", "/*"].map((path) => ({ id, path })));
  });
});
