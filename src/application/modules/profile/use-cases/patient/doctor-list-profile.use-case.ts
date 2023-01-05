import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {sortUserDtosByName} from 'app/support/sort.helper';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';

export class DoctorListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getMyDoctorList(): Promise<MyDoctorDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getDoctorsByPatientUserIdAndStatus(
            patient.id,
            PatientDataAccessStatus.Approved,
        );

        const myDoctors = items.map((patientDataAccess) => {
            const dto = MyDoctorDto.fromUserAndDoctorMetadata(
                patientDataAccess.grantedUser,
                patientDataAccess.grantedUser.doctorMetadata,
            );
            dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);
            dto.accessId = patientDataAccess.id;

            return dto;
        });

        return sortUserDtosByName(myDoctors) as MyDoctorDto[];
    }
}
