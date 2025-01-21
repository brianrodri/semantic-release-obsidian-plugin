import { stat } from "fs/promises";
import { afterEach, describe, expect, it, vi } from "vitest";

import { verifyConditions } from "./verify.js";

vi.mock("fs/promises", async (importOriginal) => {
    const original = await importOriginal();
    return { ...original, stat: vi.fn() };
});

describe("verify step of the plugin", () => {
    afterEach(vi.clearAllMocks);

    it("valid files", async () => {
        vi.mocked(stat).mockResolvedValue({ isFile: () => true });

        await expect(verifyConditions()).resolves.toBeUndefined();
    });

    it("invalid files", async () => {
        vi.mocked(stat).mockResolvedValue({ isFile: () => false });

        await expect(verifyConditions()).rejects.toThrowError(/Not a file/);
    });

    it("missing files", async () => {
        vi.mocked(stat).mockRejectedValue(new Error("File is missing"));

        await expect(verifyConditions()).rejects.toThrowError(/File is missing/);
    });
});
