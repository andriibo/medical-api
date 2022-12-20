import {UserDto} from 'domain/dtos/response/user/user.dto';

export function sortUserDtosByName(users: UserDto[]): UserDto[] {
    return users.sort(function (aPatient, bPatient) {
        const aName = `${aPatient.firstName} ${aPatient.lastName}`;
        const bName = `${bPatient.firstName} ${bPatient.lastName}`;

        return aName.localeCompare(bName);
    });
}
