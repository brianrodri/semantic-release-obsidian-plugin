import { execa } from "execa";
import { expect, test, vi } from "vitest";
import { add, commit, push } from "./git.js";

vi.mock("execa", () => ({ execa: vi.fn() }));

test("git add", async () => {
    await add(["one.txt", "two.txt"]);
    expect(execa).toHaveBeenCalledWith("git", ["add", "--force", "--ignore-errors", "one.txt", "two.txt"], { reject: false });
});

test("git commit", async () => {
    await commit("Initial commit");
    expect(execa).toHaveBeenCalledWith("git", ["commit", "-m", "Initial commit"]);
});

test("git push", async () => {
    await push("origin", "main");
    expect(execa).toHaveBeenCalledWith("git", ["push", "--tags", "origin", "HEAD:main"]);
});
