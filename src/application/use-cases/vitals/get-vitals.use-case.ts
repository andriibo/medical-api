import {AccessToVitalsDataDeniedError} from 'app/errors';
import {IPatientDataAccessRepository, IVitalRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {GetVitalsDto} from 'domain/dtos/request/vital';
import {GetVitalsDto as GetVitalsResponseDto} from 'domain/dtos/response/vital/';
import { PatientDataAccess, PatientDataAccessStatus } from 'domain/entities/patient-data-access.entity';

export class GetVitalsUseCase {
    constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly vitalRepository: IVitalRepository,
    ) {}

    public async getVitalsByPatient(dto: GetVitalsDto): Promise<GetVitalsResponseDto> {
        const user = await this.authedUserService.getUser();
        if (user.userId !== dto.userId) {
            throw new AccessToVitalsDataDeniedError('Other user\'s vitals data is not available');
        }
        const vitals = await this.vitalRepository.getByUserForInterval(dto.userId, dto.startDate, dto.endDate);

        return GetVitalsResponseDto.fromVitalsList(vitals);
    }

    public async getVitalsByDoctor(dto: GetVitalsDto): Promise<GetVitalsResponseDto> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.patientDataAccessRepository.getOneByPatientAndGrantedUserId(dto.userId, user.userId);
        if (this.isDoctorHasNoAccess(dataAccess)) {
            throw new AccessToVitalsDataDeniedError('There is no access to patient\'s vitals data');
        }

        const vitals = await this.vitalRepository.getByUserForInterval(dto.userId, dto.startDate, dto.endDate);

        return GetVitalsResponseDto.fromVitalsList(vitals);
    }

    private isDoctorHasAccess(dataAccess: PatientDataAccess): boolean {
        return dataAccess !== null && dataAccess.status === PatientDataAccessStatus.Approved;
    }

    private isDoctorHasNoAccess(dataAccess: PatientDataAccess): boolean {
        return !this.isDoctorHasAccess(dataAccess);
    }
}
