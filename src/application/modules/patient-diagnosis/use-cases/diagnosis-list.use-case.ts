import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDiagnosis, User} from 'domain/entities';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';
import {IUserRepository} from 'app/modules/auth/repositories';
import {DiagnosisDto} from 'domain/dtos/response/patient-diagnosis/diagnosis.dto';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

export class DiagnosisListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly userRepository: IUserRepository,
        private readonly patientDiagnosisRepository: IPatientDiagnosisRepository,
        private readonly patientDiagnosisSpecification: PatientDiagnosisSpecification,
        private readonly userDtoService: UserDtoService,
    ) {}

    public async getList(patientUserId: string): Promise<DiagnosisDto[]> {
        const user = await this.authedUserService.getUser();

        await this.patientDiagnosisSpecification.assertUserCanOperateDiagnosis(user, patientUserId);

        const items = await this.patientDiagnosisRepository.getByPatientUserId(patientUserId);

        const users = await this.getUsers(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        return items.map((item) => {
            const dto = DiagnosisDto.fromPatientDiagnosis(item);
            dto.createdByUser = this.userDtoService.createUserDtoByUser(indexedUsers[item.createdBy]);

            return dto;
        });
    }

    private async getUsers(items: PatientDiagnosis[]): Promise<User[]> {
        const userIds = items.map((item) => item.createdBy);

        return await this.userRepository.getByIds(userIds);
    }
}
