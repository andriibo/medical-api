import {UpdateMedicationDto} from 'domain/dtos/request/patient-medication/update-medication.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientMedication} from 'domain/entities';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {IPatientMedicationEntityMapper} from 'app/modules/patient-medication/mappers/patient-medication-entity.mapper';
import {PatientMedicationSpecification} from 'app/modules/patient-medication/specifications/patient-medication.specification';
import {EntityNotFoundError} from 'app/errors';

export class UpdateMedicationUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMedicationRepository: IPatientMedicationRepository,
        private readonly patientMedicationEntityMapper: IPatientMedicationEntityMapper,
        private readonly patientMedicationSpecification: PatientMedicationSpecification,
    ) {}

    public async updateMedication(medicationId: string, dto: UpdateMedicationDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const medication = await this.getMedication(medicationId);

        await this.patientMedicationSpecification.assertUserCanOperateMedication(user, medication.patientUserId);

        const modifiedMedication = this.patientMedicationEntityMapper.mapByUpdateMedicationDto(dto, medication);

        await this.patientMedicationRepository.update(modifiedMedication);
    }

    private async getMedication(medicationId: string): Promise<PatientMedication> {
        const medication = await this.patientMedicationRepository.getOneById(medicationId);

        if (medication === null) {
            throw new EntityNotFoundError('Medication Not Found.');
        }

        return medication;
    }
}
