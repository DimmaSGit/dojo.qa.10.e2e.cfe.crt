import { test, expect } from "@playwright/test";
import { getVotingMessage } from './vote-age-validator'

test("vote-age-validation - 17", async () => {
    const message = getVotingMessage(17);
    expect(message).toBe("Ви ще не можете голосувати.");
})

test("vote-age-validation - 18", async () => {
    const message = getVotingMessage(18);
    expect(message).toBe("Ви можете голосувати.");
});

test("vote-age-validation - 30", async () => {
    const message = getVotingMessage(30);
    expect(message).toBe("Ви можете голосувати.");
});
test("vote-age-validation - -19", async () => {
    const message = getVotingMessage(-19);
    expect(message).toBe("Age must be a non-negative integer");
});
test("vote-age-validation - 91.5", async () => {
    const message = getVotingMessage(91.5);
    expect(message).toBe("Age must be a non-negative integer");
});