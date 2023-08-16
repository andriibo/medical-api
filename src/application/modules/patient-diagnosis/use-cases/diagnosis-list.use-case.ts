import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';
import {PatientDiagnosisDto} from 'domain/dtos/response/patient-diagnosis/patient-diagnosis.dto';
import {PatientDiagnosis} from 'domain/entities';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';
import {PatientDiagnosesDto} from 'domain/dtos/response/patient-diagnosis/patient-diagnoses.dto';

export class DiagnosisListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDiagnosisRepository: IPatientDiagnosisRepository,
        private readonly patientDiagnosisSpecification: PatientDiagnosisSpecification,
        private readonly userRepository: IUserRepository,
        private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public async getList(patientUserId: string): Promise<PatientDiagnosesDto> {
        const user = await this.authedUserService.getUser();

        await this.patientDiagnosisSpecification.assertUserCanOperateDiagnosis(user, patientUserId);

        const items = await this.patientDiagnosisRepository.getByPatientUserId(patientUserId);

        const dto = new PatientDiagnosesDto();
        dto.diagnoses = items.map((item) => PatientDiagnosisDto.fromPatientDiagnosis(item));
        dto.users = await this.getUsers(items);

        return dto;
    }

    private async getUsers(medications: PatientDiagnosis[]): Promise<UserDto[]> {
        const userIds = [];
        medications.map((item) => userIds.push(item.createdBy));

        const users = await this.userRepository.getByIds(userIds);

        return users.map((user) => this.userDtoMapper.mapUserDtoByUser(user));
    }
}
