import { expect, test, vi } from "vitest";
import { readJSON, writeJSON } from "./json-io.js";

import { prepare } from "./prepare.js";

vi.mock("./json-io.js", async (importOriginal) => {
    const original = await importOriginal();
    return { ...original, readJSON: vi.fn(), writeJSON: vi.fn() };
});

test("writes new version to all files", async () => {
    const mockData = {
        "package.json": { version: "1.0.0" },
        "package-lock.json": { version: "1.0.0" },
        "manifest.json": { version: "1.0.0", minAppVersion: "0.15.0" },
        "versions.json": { "1.0.0": "0.15.0" },
    };
    vi.mocked(readJSON).mockImplementation((path) => mockData[path]);

    await expect(prepare({}, { nextRelease: { version: "2.0.0" } })).resolves.toBeUndefined();

    expect(writeJSON).toHaveBeenCalledWith("package.json", { version: "2.0.0" });
    expect(writeJSON).toHaveBeenCalledWith("package-lock.json", { version: "2.0.0" });
    expect(writeJSON).toHaveBeenCalledWith("manifest.json", { version: "2.0.0", minAppVersion: "0.15.0" });
    expect(writeJSON).toHaveBeenCalledWith("versions.json", { "1.0.0": "0.15.0", "2.0.0": "0.15.0" });
});
