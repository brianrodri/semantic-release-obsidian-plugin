# semantic-release-obsidian-plugin

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to handle Obsidian plugin metadata and triggering GitHub releases.

| Step               | Description                                        |
|--------------------|----------------------------------------------------|
| `verifyConditions` | Verify required Obsidian plugin files are present. |
| `prepare`          | Update metadata files with the new version.        |

## Install

```bash
$ npm install brianrodri/semantic-release-obsidian-plugin -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        ["brianrodri/semantic-release-obsidian-plugin", {
            "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }]
    ]
}
```

With this example, for each release a release commit will be pushed to the remote Git repository with:
- a message formatted like `chore(release): <version> [skip ci]\n\n<release notes>`
- the `package.js` and `.css` files in the `dist` directory, the files in the `docs` directory and the `package.json`

## Configuration

### Git authentication

The Git user associated with the [Git credentials](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/ci-configuration.md#authentication) has to be able to push commit to the [release branch](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#branch).

When configuring branches permission on a Git hosting service (e.g. [GitHub protected branches](https://help.github.com/articles/about-protected-branches), [GitLab protected branches](https://docs.gitlab.com/ee/user/project/protected_branches.html) or [Bitbucket branch permissions](https://confluence.atlassian.com/bitbucket/branch-permissions-385912271.html)) it might be necessary to create a specific configuration in order to allow the **semantic-release** user to bypass global restrictions. For example on GitHub you can uncheck "Include administrators" and configure **semantic-release** to use an administrator user, so the plugin can push the release commit without requiring [status checks](https://help.github.com/articles/about-required-status-checks) and [pull request reviews](https://help.github.com/articles/about-required-reviews-for-pull-requests).

### Environment variables

| Variable              | Description                                                                                 | Default                              |
|-----------------------|---------------------------------------------------------------------------------------------|--------------------------------------|
| `GIT_AUTHOR_NAME`     | The author name associated with the release commit. See [Git environment variables][1].     | @semantic-release-bot.               |
| `GIT_AUTHOR_EMAIL`    | The author email associated with the release commit. See [Git environment variables][1].    | @semantic-release-bot email address. |
| `GIT_COMMITTER_NAME`  | The committer name associated with the release commit. See [Git environment variables][1].  | @semantic-release-bot.               |
| `GIT_COMMITTER_EMAIL` | The committer email associated with the release commit. See [Git environment variables][1]. | @semantic-release-bot email address. |

### Options

| Options   | Description                                                  | Default                                                                    |
|-----------|--------------------------------------------------------------|----------------------------------------------------------------------------|
| `message` | The message for the release commit. See [message](#message). | `chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}` |

#### `message`

The message for the release commit is generated with [Lodash template](https://lodash.com/docs#template). The following variables are available:

| Parameter           | Description                                                                               |
|---------------------|-------------------------------------------------------------------------------------------|
| `branch`            | The branch from which the release is done.                                                |
| `branch.name`       | The branch name.                                                                          |
| `branch.type`       | The [type of branch][2].                                                                  |
| `branch.channel`    | The distribution channel on which to publish releases from this branch.                   |
| `branch.range`      | The range of [semantic versions][3] to support on this branch.                            |
| `branch.prerelease` | The pre-release detonation to append to [semantic versions][3] released from this branch. |
| `lastRelease`       | `Object` with `version`, `gitTag` and `gitHead` of the last release.                      |
| `nextRelease`       | `Object` with `version`, `gitTag`, `gitHead` and `notes` of the release being done.       |

**Note**: It is recommended to include `[skip ci]` in the commit message to not trigger a new build. Some CI service support the `[skip ci]` keyword only in the subject of the message.

##### `message` examples

The `message` `Release <%= nextRelease.version %> - <%= new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) %> [skip ci]\n\n<%= nextRelease.notes %>` will generate the commit message:

> Release v1.0.0 - Oct. 21, 2015 1:24 AM \[skip ci\]<br><br>## 1.0.0<br><br>### Features<br>* Generate 1.21 gigawatts of electricity<br>...

[1]: https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables#_committing
[2]: https://github.com/semantic-release/semantic-release/blob/master/docs/usage/workflow-configuration.md#branch-types
[3]: https://semver.org
