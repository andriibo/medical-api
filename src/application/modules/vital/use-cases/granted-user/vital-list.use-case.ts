import {IVitalRepository} from 'app/modules/vital/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {GetVitalsByGrantedUserDto} from 'domain/dtos/request/vital';
import {VitalsDto} from 'domain/dtos/response/vital/';
import {VitalsDtoService} from 'app/modules/vital/services/vitals-dto.service';

export class VitalListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly vitalsDtoService: VitalsDtoService,
    ) {}

    public async getList(dto: GetVitalsByGrantedUserDto): Promise<VitalsDto> {
        const grantedUser = await this.authedUserService.getUser();

        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            grantedUser.id,
            dto.patientUserId,
        );
        const vitals = await this.vitalRepository.getByUserIdForInterval(dto.patientUserId, dto.startDate, dto.endDate);

        return this.vitalsDtoService.createDtoByVitals(vitals);
    }
}
