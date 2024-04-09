import { execa } from "execa";

async function add(files) {
    return execa("git", ["add", "--force", "--ignore-errors", ...files], { reject: false });
}

async function commit(message) {
    return execa("git", ["commit", "-m", message]);
}

async function push(origin, branch) {
    return execa("git", ["push", "--tags", origin, `HEAD:${branch}`]);
}

module.exports = { add, commit, push };
