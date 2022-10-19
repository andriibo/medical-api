import {IPatientDataAccessRepository, IVitalRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {GetVitalsDto} from 'domain/dtos/request/vital';
import {GetVitalsDto as GetVitalsResponseDto} from 'domain/dtos/response/vital/';

export class GetVitalsUseCase {
    constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly vitalRepository: IVitalRepository,
    ) {}

    public async getVitalsByPatient(dto: GetVitalsDto): Promise<GetVitalsResponseDto> {
        const user = await this.authedUserService.getUser();
        if (user.userId !== dto.userId) {
            throw new Error(); //TODO: Create custom exception
        }
        const vitals = await this.vitalRepository.getByUserForInterval(dto.userId, dto.startDate, dto.endDate);

        return GetVitalsResponseDto.fromVitalsList(vitals);
    }

    public async getVitalsByDoctor(dto: GetVitalsDto): Promise<GetVitalsResponseDto> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.patientDataAccessRepository.getOneByPatientAndGrantedUserId(user, dto.userId);
        if (dataAccess === null) {
            throw new Error(); //TODO: Create custom exception
        }

        const vitals = await this.vitalRepository.getByUserForInterval(dto.userId, dto.startDate, dto.endDate);

        return GetVitalsResponseDto.fromVitalsList(vitals);
    }
}
