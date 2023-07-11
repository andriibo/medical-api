import {CreateMedicationDto} from 'domain/dtos/request/patient-medication/create-medication.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientMedication, User} from 'domain/entities';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {IPatientMedicationEntityMapper} from 'app/modules/patient-medication/mappers/patient-medication-entity.mapper';
import {PatientMedicationSpecification} from 'app/modules/patient-medication/specifications/patient-medication.specification';

export class CreateMedicationUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMedicationRepository: IPatientMedicationRepository,
        private readonly patientMedicationEntityMapper: IPatientMedicationEntityMapper,
        private readonly patientMedicationSpecification: PatientMedicationSpecification,
    ) {}

    public async createMedication(dto: CreateMedicationDto): Promise<void> {
        const user = await this.authedUserService.getUser();

        await this.patientMedicationSpecification.assertUserCanOperateMedication(user, dto.patientUserId);

        const patientMedication = this.createPatientMedication(user, dto);

        await this.patientMedicationRepository.create(patientMedication);
    }

    private createPatientMedication(createdBy: User, dto: CreateMedicationDto): PatientMedication {
        const patientMedication = this.patientMedicationEntityMapper.mapByCreateMedicationDto(dto);
        patientMedication.createdBy = createdBy.id;

        return patientMedication;
    }
}
