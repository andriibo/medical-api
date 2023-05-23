import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';
import {sortUserDtosByName} from 'support/sort.helper';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';

export class DoctorListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public async getMyDoctorList(): Promise<MyDoctorDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getDoctorsByPatientUserIdAndStatus(
            patient.id,
            PatientDataAccessStatus.Approved,
        );

        const myDoctors = items.map((patientDataAccess) => {
            const dto = this.userDtoMapper.mapDoctorDtoByUserAndMetadata(
                patientDataAccess.grantedUser,
                patientDataAccess.grantedUser.doctorMetadata,
            ) as MyDoctorDto;
            dto.accessId = patientDataAccess.id;

            return dto;
        });

        return sortUserDtosByName(myDoctors) as MyDoctorDto[];
    }
}
