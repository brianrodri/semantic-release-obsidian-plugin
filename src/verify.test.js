import { stat } from "fs/promises";
import { expect, it, vi } from "vitest";

import { verifyConditions } from "./verify.js";

vi.mock("fs/promises", async (importOriginal) => {
    const original = await importOriginal();
    return { ...original, stat: vi.fn() };
});

it("valid files", async () => {
    stat.mockResolvedValue({ isFile: () => true });

    await expect(verifyConditions()).resolves.toBeUndefined();
});

it("invalid files", async () => {
    stat.mockResolvedValue({ isFile: () => false });

    await expect(verifyConditions()).rejects.toThrowError(/Not a file/);
});

it("missing files", async () => {
    stat.mockRejectedValue(new Error("File is missing"));

    await expect(verifyConditions()).rejects.toThrowError(/File is missing/);
});
