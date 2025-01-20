export async function allWithAggregateErrors(promises, message) {
    const outcomes = await Promise.allSettled(promises);
    const errors = outcomes.filter((o) => o.status === "rejected").map((o) => o.reason);

    if (errors.length > 0) {
        const aggregateMessage = errors.map((reason) => "-\t" + reason.message.replaceAll(/\n/gm, "\n\t"));
        throw new AggregateError(errors, (message ? `${message}\n` : "") + aggregateMessage.join("\n"));
    } else {
        return outcomes.map((o) => o.value);
    }
}
