import {VitalsDto} from 'domain/dtos/response/vital/';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholds, Vital} from 'domain/entities';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';

export class VitalsDtoService {
    public constructor(
        private readonly thresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdsDtoService: ThresholdsDtoService,
    ) {}

    public async createDtoByVitals(vitals: Vital[]): Promise<VitalsDto> {
        const vitalsDto = VitalsDto.fromVitals(vitals);
        const thresholdsGroup = await this.getThresholdsGroup(vitalsDto);

        const thresholdsDto = await this.thresholdsDtoService.createDtoByThresholds(thresholdsGroup);
        vitalsDto.thresholds = thresholdsDto.thresholds;
        vitalsDto.users = thresholdsDto.users;

        return vitalsDto;
    }

    private async getThresholdsGroup(vitalsDto: VitalsDto): Promise<PatientVitalThresholds[]> {
        const thresholdsIds = vitalsDto.vitals.map((vitals) => vitals[1]);

        return await this.thresholdsRepository.getByIds(thresholdsIds);
    }
}
