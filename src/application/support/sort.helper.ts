export function sortUserDtosByName<T>(users: T[]): T[] {
    return users.sort(function (aPatient, bPatient) {
        const aName = `${aPatient['firstName']} ${aPatient['lastName']}`;
        const bName = `${bPatient['firstName']} ${bPatient['lastName']}`;

        return aName.localeCompare(bName);
    });
}
