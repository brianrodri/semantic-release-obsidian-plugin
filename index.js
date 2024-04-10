import { prepare as prepareImpl } from "./src/prepare.js";
import { verifyConditions as verifyConditionsImpl } from "./src/verify.js";

let verified = false;

export async function verifyConditions(pluginConfig, context) {
    await verifyConditionsImpl(pluginConfig, context);
    verified = true;
}

export async function prepare(pluginConfig, context) {
    if (!verified) {
        await verifyConditions(pluginConfig, context);
    }
    await prepareImpl(pluginConfig, context);
}
