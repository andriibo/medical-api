import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {PatientMedicationSpecification} from 'app/modules/patient-medication/specifications/patient-medication.specification';
import {MedicationDto} from 'domain/dtos/response/patient-medication/medication.dto';

export class MedicationListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMedicationRepository: IPatientMedicationRepository,
        private readonly patientMedicationSpecification: PatientMedicationSpecification,
    ) {}

    public async getList(patientUserId: string): Promise<MedicationDto[]> {
        const user = await this.authedUserService.getUser();

        await this.patientMedicationSpecification.assertUserCanOperateMedication(user, patientUserId);

        const items = await this.patientMedicationRepository.getByPatientUserId(patientUserId);

        return items.map((item) => MedicationDto.fromPatientMedication(item));
    }
}
