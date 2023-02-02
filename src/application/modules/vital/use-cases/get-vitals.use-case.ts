import {IVitalRepository} from 'app/modules/vital/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {GetVitalsByGrantedUserDto, GetVitalsByPatientDto} from 'domain/dtos/request/vital';
import {VitalsDto} from 'domain/dtos/response/vital/';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholds, Vital} from 'domain/entities';

export class GetVitalsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly thresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdsDtoService: ThresholdsDtoService,
    ) {}

    public async getVitalsByPatient(dto: GetVitalsByPatientDto): Promise<VitalsDto> {
        const user = await this.authedUserService.getUser();
        const vitals = await this.vitalRepository.getByUserIdForInterval(user.id, dto.startDate, dto.endDate);

        return this.getVitalsDto(vitals);
    }

    public async getVitalsByGrantedUser(dto: GetVitalsByGrantedUserDto): Promise<VitalsDto> {
        const grantedUser = await this.authedUserService.getUser();

        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            grantedUser.id,
            dto.patientUserId,
        );
        const vitals = await this.vitalRepository.getByUserIdForInterval(dto.patientUserId, dto.startDate, dto.endDate);

        return this.getVitalsDto(vitals);
    }

    private async getVitalsDto(vitals: Vital[]): Promise<VitalsDto> {
        const vitalsDto = VitalsDto.fromVitals(vitals);
        const thresholds = await this.getThresholdsGroup(vitalsDto);

        vitalsDto.thresholds = await this.thresholdsDtoService.createDtosByThresholdsGroup(thresholds);

        return vitalsDto;
    }

    private async getThresholdsGroup(vitalsDto: VitalsDto): Promise<PatientVitalThresholds[]> {
        const thresholdsIds = vitalsDto.vitals.map((vitals) => vitals.thresholdsId);

        return await this.thresholdsRepository.getByIds(thresholdsIds);
    }
}
