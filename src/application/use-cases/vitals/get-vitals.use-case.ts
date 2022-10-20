import {IVitalRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {GetVitalsByDoctorDto, GetVitalsByPatientDto} from 'domain/dtos/request/vital';
import {GetVitalsDto as GetVitalsResponseDto} from 'domain/dtos/response/vital/';

export class GetVitalsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async getVitalsByPatient(dto: GetVitalsByPatientDto): Promise<GetVitalsResponseDto> {
        const user = await this.authedUserService.getUser();
        const vitals = await this.vitalRepository.getByUserForInterval(user.userId, dto.startDate, dto.endDate);

        return GetVitalsResponseDto.fromVitalsList(vitals);
    }

    public async getVitalsByDoctor(dto: GetVitalsByDoctorDto): Promise<GetVitalsResponseDto> {
        const doctor = await this.authedUserService.getUser();

        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(doctor, dto.userId);
        const vitals = await this.vitalRepository.getByUserForInterval(dto.userId, dto.startDate, dto.endDate);

        return GetVitalsResponseDto.fromVitalsList(vitals);
    }
}
