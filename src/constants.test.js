import { expect, it } from "vitest";

import { getPluginFiles } from "./constants.js";

it("plugin files", () => {
    const files = getPluginFiles();
    expect(files).toContain("package.json");
    expect(files).toContain("package-lock.json");
    expect(files).toContain("manifest.json");
    expect(files).toContain("versions.json");
});
