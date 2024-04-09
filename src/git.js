import { execa } from "execa";

export async function add(files) {
    return execa("git", ["add", "--force", "--ignore-errors", ...files], { reject: false });
}

export async function commit(message) {
    return execa("git", ["commit", "-m", message]);
}

export async function push(origin, branch) {
    return execa("git", ["push", "--tags", origin, `HEAD:${branch}`]);
}
