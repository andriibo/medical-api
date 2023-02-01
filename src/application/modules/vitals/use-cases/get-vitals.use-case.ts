import {IVitalRepository} from 'app/modules/vitals/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {GetVitalsByGrantedUserDto, GetVitalsByPatientDto} from 'domain/dtos/request/vital';
import {GetVitalsDto as GetVitalsResponseDto} from 'domain/dtos/response/vital/';

export class GetVitalsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async getVitalsByPatient(dto: GetVitalsByPatientDto): Promise<GetVitalsResponseDto> {
        const user = await this.authedUserService.getUser();
        const vitals = await this.vitalRepository.getByUserForInterval(user.id, dto.startDate, dto.endDate);

        return GetVitalsResponseDto.fromVitalsList(vitals);
    }

    public async getVitalsByGrantedUser(dto: GetVitalsByGrantedUserDto): Promise<GetVitalsResponseDto> {
        const grantedUser = await this.authedUserService.getUser();

        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            grantedUser.id,
            dto.patientUserId,
        );
        const vitals = await this.vitalRepository.getByUserForInterval(dto.patientUserId, dto.startDate, dto.endDate);

        return GetVitalsResponseDto.fromVitalsList(vitals);
    }
}
