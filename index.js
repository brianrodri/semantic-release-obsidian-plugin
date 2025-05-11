import { prepare as prepareImpl } from "./src/prepare.js";
import { verifyConditions as verifyConditionsImpl } from "./src/verify.js";

export async function verifyConditions(pluginConfig, context) {
    await verifyConditionsImpl(pluginConfig, context);
}

export async function prepare(pluginConfig, context) {
    await prepareImpl(pluginConfig, context);
}
