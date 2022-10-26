import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientMedication} from 'domain/entities';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {PatientMedicationSpecification} from 'app/modules/patient-medication/specifications/patient-medication.specification';
import {EntityNotFoundError} from 'app/errors';

export class DeleteMedicationUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMedicationRepository: IPatientMedicationRepository,
        private readonly patientMedicationSpecification: PatientMedicationSpecification,
    ) {}

    public async deleteMedication(medicationId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const medication = await this.getMedication(medicationId);

        await this.patientMedicationSpecification.assertUserCanOperateMedication(user, medication.patientUserId);

        await this.patientMedicationRepository.delete(medication);
    }

    private async getMedication(medicationId: string): Promise<PatientMedication> {
        const medication = await this.patientMedicationRepository.getOneById(medicationId);

        if (medication === null) {
            throw new EntityNotFoundError('Medication Not Found.');
        }

        return medication;
    }
}
