import { stat } from "fs/promises";
import { expect, test, vi } from "vitest";
import { verifyConditions } from "./verify.js";

vi.mock("fs/promises", () => ({ stat: vi.fn() }));

test("valid files", async () => {
    stat.mockResolvedValue({ isFile: () => true });

    await expect(verifyConditions()).resolves.toBeUndefined();
});

test("invalid files", async () => {
    stat.mockResolvedValue({ isFile: () => false });

    await expect(verifyConditions()).rejects.toThrowError(/Not a file/);
});

test("missing files", async () => {
    stat.mockRejectedValue(new Error("File is missing"));

    await expect(verifyConditions()).rejects.toThrowError(/File is missing/);
});
