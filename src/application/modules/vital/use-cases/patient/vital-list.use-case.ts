import {IVitalRepository} from 'app/modules/vital/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {GetVitalsByPatientDto} from 'domain/dtos/request/vital';
import {VitalsDto} from 'domain/dtos/response/vital/';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholds, Vital} from 'domain/entities';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';

export class VitalListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
        private readonly thresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdsDtoService: ThresholdsDtoService,
    ) {}

    public async getList(dto: GetVitalsByPatientDto): Promise<VitalsDto> {
        const user = await this.authedUserService.getUser();
        const vitals = await this.vitalRepository.getByUserIdForInterval(user.id, dto.startDate, dto.endDate);

        return this.getVitalsDto(vitals);
    }

    private async getVitalsDto(vitals: Vital[]): Promise<VitalsDto> {
        const vitalsDto = VitalsDto.fromVitals(vitals);
        const thresholdsGroup = await this.getThresholdsGroup(vitalsDto);

        const thresholdsDto = await this.thresholdsDtoService.createDtoByThresholds(thresholdsGroup);
        vitalsDto.thresholds = thresholdsDto.thresholds;
        vitalsDto.users = thresholdsDto.users;

        return vitalsDto;
    }

    private async getThresholdsGroup(vitalsDto: VitalsDto): Promise<PatientVitalThresholds[]> {
        const thresholdsIds = vitalsDto.vitals.map((vitals) => vitals.thresholdsId);

        return await this.thresholdsRepository.getByIds(thresholdsIds);
    }
}
