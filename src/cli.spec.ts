import { cli } from "./cli";
import { describe, expect, it, vi } from "vitest";

describe("cli", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});

  it("parses the name", () => {
    expect(cli(["name"]).name).toBe("name");
  });

  it("throws if the name is missing", () => {
    expect(() => cli([])).toThrow();
  });

  it("parses the region", () => {
    expect(cli(["_", "--region", "us-east-2"]).region).toBe("us-east-2");
  });

  it('defaults the region to "us-east-1"', () => {
    expect(cli(["_"]).region).toBe("us-east-1");
  });

  it("parses the dry-run flag", () => {
    expect(cli(["_", "--dry-run"]).dry).toBe(true);
  });

  it("defaults dry-run flag to false", () => {
    expect(cli(["_"]).dry).toBe(false);
  });
});
