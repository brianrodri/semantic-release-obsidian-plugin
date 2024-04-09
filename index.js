export function verifyConditions(pluginConfig, context) {
    const { logger } = context;
    logger.log(pluginConfig);
}

export function prepare(pluginConfig, context) {
    const { logger } = context;
    logger.log(pluginConfig);
}
