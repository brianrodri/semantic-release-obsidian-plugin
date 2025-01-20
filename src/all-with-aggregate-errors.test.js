import { allWithAggregateErrors } from "./all-with-aggregate-errors.js";
import { it, expect, describe } from "vitest";

describe("awaitAllWithAggregateError", () => {
    it("returns array of values when all promises resolve", async () => {
        const promises = [1, 2, 3, 4, 5].map((i) => Promise.resolve(i));

        await expect(allWithAggregateErrors(promises)).resolves.toEqual([1, 2, 3, 4, 5]);
    });

    it("throws if any promise rejects", async () => {
        const promises = [Promise.resolve(1), Promise.reject(new Error("Rejected")), Promise.resolve(3)];

        await expect(allWithAggregateErrors(promises)).rejects.toThrowError();
    });

    it("creates an aggregate error message", async () => {
        const promises = [
            Promise.reject(new Error("Uh-oh!")),
            Promise.reject(new Error("Ugh!\nA really long\n\tmessage..!")),
        ];

        await expect(allWithAggregateErrors(promises)).rejects.toThrowError(
            ["-\tUh-oh!", "-\tUgh!", "\tA really long", "\t\tmessage..!"].join("\n"),
        );
    });

    it("prepends aggregate error message with input message", async () => {
        const promises = [
            Promise.reject(new Error("Uh-oh!")),
            Promise.reject(new Error("Ugh!\nA really long\n\tmessage..!")),
        ];

        await expect(allWithAggregateErrors(promises, "oh man!")).rejects.toThrowError(
            ["oh man!", "-\tUh-oh!", "-\tUgh!", "\tA really long", "\t\tmessage..!"].join("\n"),
        );
    });
});
