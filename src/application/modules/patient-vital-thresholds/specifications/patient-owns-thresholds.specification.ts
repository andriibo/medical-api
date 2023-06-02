import {User} from 'domain/entities';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {arrayUnique, indexObjects} from 'support/array.helper';
import {PatientVitalThresholdsSpecificationError} from 'app/modules/patient-vital-thresholds/errors';

export class PatientOwnsThresholdsSpecification {
    public constructor(private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository) {}

    public async assertSatisfiedBy(patient: User, thresholdsIds: string[]): Promise<void> {
        thresholdsIds = arrayUnique(thresholdsIds);

        const thresholdsGroup = await this.patientVitalThresholdsRepository.getByIds(thresholdsIds);
        const indexedThresholdsGroup = indexObjects(thresholdsGroup, 'id');

        for (const thresholdsId of thresholdsIds) {
            const isThresholdsValid =
                thresholdsId in indexedThresholdsGroup &&
                indexedThresholdsGroup[thresholdsId].patientUserId === patient.id;

            if (!isThresholdsValid) {
                throw new PatientVitalThresholdsSpecificationError('Thresholds In Invalid.');
            }
        }
    }
}
