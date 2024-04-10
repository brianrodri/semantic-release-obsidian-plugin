/** @type { import("@semantic-release/release-config").ReleaseConfig } */
export const branches = ["main"];
export const plugins = [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "brianrodri/semantic-release-obsidian-plugin",
    [
        "@semantic-release/github",
        {
            assets: ["package.json", "package-lock.json", "manifest.json", "versions.json"],
        },
    ],
];
