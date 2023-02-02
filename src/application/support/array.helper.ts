export function arrayUnique(items: any[]): any[] {
    return items.filter((value, index, self) => self.indexOf(value) === index);
}

export function getFirstByPropValue<T extends object>(objects: T[], propName: string, searchValue: any): T | null {
    for (const object of objects) {
        if (propName in object && object[propName] === searchValue) {
            return object;
        }
    }

    return null;
}

export function indexObjects(objects: object[], propName: string): object {
    const indexedObjects = {};

    objects.map((object) => {
        if (propName in object) {
            indexedObjects[object[propName]] = object;
        }
    });

    return indexedObjects;
}
