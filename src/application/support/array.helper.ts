export function arrayUnique(items: any[]): any[] {
    return items.filter((value, index, self) => self.indexOf(value) === index);
}

export function getFirstByPropValue<T>(objects: T[], propName: string, searchValue: any): T | null {
    for (const object of objects) {
        if (propName in object && object[propName] === searchValue) {
            return object;
        }
    }

    return null;
}

export function sortByName<T>(users: T[]): T[] {
    return users.sort(function (aPatient, bPatient) {
        const aName = `${aPatient['firstName']} ${aPatient['lastName']}`;
        const bName = `${bPatient['firstName']} ${bPatient['lastName']}`;

        return aName.localeCompare(bName);
    });
}
