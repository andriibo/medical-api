export function currentUnixTimestamp(): number {
    return Math.floor(Date.now() / 1000);
}

export function convertToUnixTimestamp(date: string): number {
    return Math.floor(new Date(date).getTime() / 1000);
}
