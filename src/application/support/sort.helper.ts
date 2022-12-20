import {UserDto} from 'domain/dtos/response/user/user.dto';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';

export function sortUserDtosByName(users: UserDto[]): UserDto[] {
    return users.sort(function (aPatient, bPatient) {
        const aName = `${aPatient.firstName} ${aPatient.lastName}`;
        const bName = `${bPatient.firstName} ${bPatient.lastName}`;

        return aName.localeCompare(bName);
    });
}

export function sortDataAccessDtosByCreatedAtDesc(dataAccesses: DataAccessDto[]): DataAccessDto[] {
    return dataAccesses.sort(function (aDataAccess, bDataAccess) {
        const aDate = new Date(aDataAccess.createdAt);
        const bDate = new Date(bDataAccess.createdAt);

        return bDate.getTime() - aDate.getTime();
    });
}
