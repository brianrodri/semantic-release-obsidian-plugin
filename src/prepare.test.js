import { writeFile } from "fs/promises";
import { expect, test, vi } from "vitest";
import { prepare } from "./prepare.js";

function written(content) {
    return JSON.stringify(content, null, 4) + "\n";
}

const FILE_CONTENT = {
    "package.json": written({ version: "1.0.0" }),
    "package-lock.json": written({ version: "1.0.0" }),
    "manifest.json": written({ version: "1.0.0", minAppVersion: "0.15.0" }),
    "versions.json": written({ "1.0.0": "0.15.0" }),
};

vi.mock("fs/promises", () => ({
    readFile: vi.fn((file) => FILE_CONTENT[file]),
    writeFile: vi.fn(),
}));

test("writes new version to all files", async () => {
    await expect(prepare({}, { nextRelease: { version: "2.0.0" } })).resolves.not.toThrow();

    expect(writeFile).toHaveBeenCalledWith("package.json", written({ version: "2.0.0" }));
    expect(writeFile).toHaveBeenCalledWith("package-lock.json", written({ version: "2.0.0" }));
    expect(writeFile).toHaveBeenCalledWith("manifest.json", written({ version: "2.0.0", minAppVersion: "0.15.0" }));
    expect(writeFile).toHaveBeenCalledWith("versions.json", written({ "1.0.0": "0.15.0", "2.0.0": "0.15.0" }));
});
