import { expect, test } from "vitest";
import { getPluginFiles } from "./constants.js";

test("plugin files", () => {
    expect(getPluginFiles()).toEqual(
        expect.arrayContaining(["package.json", "package-lock.json", "manifest.json", "versions.json"]),
    );
});
