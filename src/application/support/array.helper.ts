export function arrayUnique(items: any[]): any[] {
    return items.filter((value, index, self) => self.indexOf(value) === index);
}
