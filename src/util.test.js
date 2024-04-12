import { expect, test } from "vitest";
import { getPluginFiles } from "./util";

test("plugin files", () => {
    expect(getPluginFiles()).toEqual(
        expect.arrayContaining(["package.json", "package-lock.json", "manifest.json", "versions.json"]),
    );
});
