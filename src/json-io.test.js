import { readFile, writeFile } from "fs/promises";
import { afterEach, describe, expect, it, vi } from "vitest";

import { readJSON, writeJSON } from "./json-io.js";

vi.mock("fs/promises", async (importOriginal) => {
    const original = await importOriginal();
    return { ...original, readFile: vi.fn(), writeFile: vi.fn() };
});

describe("JSON input/output", () => {
    afterEach(vi.clearAllMocks);

    it("reads with fs/promises", async () => {
        vi.mocked(readFile).mockResolvedValue('{"abc": 123}');

        await expect(readJSON("path")).resolves.toEqual({ abc: 123 });
        expect(readFile).toHaveBeenCalledWith("path");
    });

    it("writes with fs/promises", async () => {
        await expect(writeJSON("path", { abc: 123 })).resolves.toBeUndefined();
        const expected = `{
            "abc": 123
        }
        `.replaceAll(/^ {8}/gm, ""); // Removes code indentation.

        expect(writeFile).toHaveBeenCalledWith("path", expected);
    });
});
