import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {sortUserDtosByName} from 'support/sort.helper';
import {MyCaregiverDto} from 'domain/dtos/response/profile/my-caregiver.dto';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';

export class CaregiverListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public async getMyCaregiverList(): Promise<MyCaregiverDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getCaregiversByPatientUserIdAndStatus(
            patient.id,
            PatientDataAccessStatus.Approved,
        );

        const myCaregivers = items.map((patientDataAccess) => {
            const dto = this.userDtoMapper.mapCaregiverDtoByUserAndMetadata(
                patientDataAccess.grantedUser,
                patientDataAccess.grantedUser.caregiverMetadata,
            ) as MyCaregiverDto;
            dto.accessId = patientDataAccess.id;

            return dto;
        });

        return sortUserDtosByName(myCaregivers) as MyCaregiverDto[];
    }
}
