import {ISortUsersService} from 'app/modules/profile/services/sort-users.service';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';

export class SortUsersService implements ISortUsersService {
    public byName(users: MyPatientDto[] | MyDoctorDto[]): MyPatientDto[] | MyDoctorDto[] {
        return users.sort(function (aPatient, bPatient) {
            const aName = `${aPatient.firstName} ${aPatient.lastName}`;
            const bName = `${bPatient.firstName} ${bPatient.lastName}`;

            return aName.localeCompare(bName);
        });
    }
}
