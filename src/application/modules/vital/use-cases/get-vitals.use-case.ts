import {IVitalRepository} from 'app/modules/vital/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {GetVitalsByGrantedUserDto, GetVitalsByPatientDto} from 'domain/dtos/request/vital';
import {VitalsDto} from 'domain/dtos/response/vital/';

export class GetVitalsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async getVitalsByPatient(dto: GetVitalsByPatientDto): Promise<VitalsDto> {
        const user = await this.authedUserService.getUser();
        const vitals = await this.vitalRepository.getByUserIdForInterval(user.id, dto.startDate, dto.endDate);

        return VitalsDto.fromVitals(vitals);
    }

    public async getVitalsByGrantedUser(dto: GetVitalsByGrantedUserDto): Promise<VitalsDto> {
        const grantedUser = await this.authedUserService.getUser();

        await this.patientDataAccessSpecification.assertGrantedUserIdHasAccess(grantedUser.id, dto.patientUserId);
        const vitals = await this.vitalRepository.getByUserIdForInterval(dto.patientUserId, dto.startDate, dto.endDate);

        return VitalsDto.fromVitals(vitals);
    }
}
