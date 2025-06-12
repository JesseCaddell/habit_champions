export function getXpRequiredForLevel(level: number): number {
    return Math.floor(100 * level * 1.25);
}