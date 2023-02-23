import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientMedication, User} from 'domain/entities';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {PatientMedicationSpecification} from 'app/modules/patient-medication/specifications/patient-medication.specification';
import {IUserRepository} from 'app/modules/auth/repositories';
import {MedicationDto} from 'domain/dtos/response/patient-medication/medication.dto';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

export class MedicationListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly userRepository: IUserRepository,
        private readonly patientMedicationRepository: IPatientMedicationRepository,
        private readonly patientMedicationSpecification: PatientMedicationSpecification,
        private readonly userDtoService: UserDtoService,
    ) {}

    public async getList(patientUserId: string): Promise<MedicationDto[]> {
        const user = await this.authedUserService.getUser();

        await this.patientMedicationSpecification.assertUserCanOperateMedication(user, patientUserId);

        const items = await this.patientMedicationRepository.getByPatientUserId(patientUserId);

        const users = await this.getUsers(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        return items.map((item) => {
            const dto = MedicationDto.fromPatientMedication(item);
            dto.createdByUser = this.userDtoService.createUserDtoByUser(indexedUsers[item.createdBy]);

            return dto;
        });
    }

    private async getUsers(items: PatientMedication[]): Promise<User[]> {
        const userIds = items.map((item) => item.createdBy);

        return await this.userRepository.getByIds(userIds);
    }
}
