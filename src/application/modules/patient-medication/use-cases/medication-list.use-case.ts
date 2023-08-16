import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {PatientMedicationSpecification} from 'app/modules/patient-medication/specifications/patient-medication.specification';
import {MedicationDto} from 'domain/dtos/response/patient-medication/medication.dto';
import {PatientMedicationsDto} from 'domain/dtos/response/patient-medication/patient-medications.dto';
import {PatientMedication} from 'domain/entities';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class MedicationListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMedicationRepository: IPatientMedicationRepository,
        private readonly patientMedicationSpecification: PatientMedicationSpecification,
        private readonly userRepository: IUserRepository,
        private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public async getList(patientUserId: string): Promise<PatientMedicationsDto> {
        const user = await this.authedUserService.getUser();

        await this.patientMedicationSpecification.assertUserCanOperateMedication(user, patientUserId);

        const items = await this.patientMedicationRepository.getByPatientUserId(patientUserId);

        const dto = new PatientMedicationsDto();
        dto.medications = items.map((item) => MedicationDto.fromPatientMedication(item));
        dto.users = await this.getUsers(items);

        return dto;
    }

    private async getUsers(medications: PatientMedication[]): Promise<UserDto[]> {
        const userIds = [];
        medications.map((item) => userIds.push(item.createdBy));

        const users = await this.userRepository.getByIds(userIds);

        return users.map((user) => this.userDtoMapper.mapUserDtoByUser(user));
    }
}
