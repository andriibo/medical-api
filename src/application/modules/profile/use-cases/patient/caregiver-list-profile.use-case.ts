import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {sortUserDtosByName} from 'app/support/sort.helper';
import {MyCaregiverDto} from 'domain/dtos/response/profile/my-caregiver.dto';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';

export class CaregiverListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getMyCaregiverList(): Promise<MyCaregiverDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getCaregiversByPatientUserIdAndStatus(
            patient.id,
            PatientDataAccessStatus.Approved,
        );

        const myCaregivers = items.map((patientDataAccess) => {
            const dto = MyCaregiverDto.fromUser(patientDataAccess.grantedUser);
            dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);
            dto.accessId = patientDataAccess.id;

            return dto;
        });

        return sortUserDtosByName(myCaregivers) as MyCaregiverDto[];
    }
}
