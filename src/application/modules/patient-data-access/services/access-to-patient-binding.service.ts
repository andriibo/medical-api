import {User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';

export class AccessToPatientBindingService {
    public constructor(private readonly patientDataAccessRepository: IPatientDataAccessRepository) {}

    public async bindAccessToPatient(patient: User): Promise<void> {
        const items = await this.patientDataAccessRepository.getByPatientEmail(patient.email);

        if (!items.length) {
            return;
        }

        items.map((item) => {
            item.patientUserId = patient.id;
            item.patientEmail = null;
        });

        await this.patientDataAccessRepository.update(items);
    }
}
