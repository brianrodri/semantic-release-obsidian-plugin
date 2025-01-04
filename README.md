# semantic-release-obsidian-plugin

[![CI](https://github.com/brianrodri/semantic-release-obsidian-plugin/actions/workflows/CI.yml/badge.svg)](https://github.com/brianrodri/semantic-release-obsidian-plugin/actions/workflows/CI.yml) [![codecov](https://codecov.io/gh/brianrodri/semantic-release-obsidian-plugin/graph/badge.svg?token=AVS80KF9ZI)](https://codecov.io/gh/brianrodri/semantic-release-obsidian-plugin)

A [**semantic-release**](https://github.com/semantic-release/semantic-release) plugin for automating the [releases of Obsidian plugins](https://docs.obsidian.md/Plugins/Releasing/Release+your+plugin+with+GitHub+Actions).

| Step               | Description                                 |
| ------------------ | ------------------------------------------- |
| `verifyConditions` | Verify required metadata files are present. |
| `prepare`          | Update metadata files with new version.     |

## Install

```bash
$ npm install brianrodri/semantic-release-obsidian-plugin --save-dev
```

## Usage

The plugin can be configured in the [`semantic-release` configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "brianrodri/semantic-release-obsidian-plugin"
    ],
    "tagFormat": "${version}"
}
```

> [!IMPORTANT]
> The `tagFormat` must be set to `${version}` to ensure that releases follow Obsidian's versioning scheme.

When `semantic-release` runs, this plugin will update the following files according to Obsidian's versioning scheme:

- `package.json`
- `package-lock.json`
- `manifest.json`
- `versions.json`
