import {AccessToVitalsDataDeniedError} from 'app/errors';
import {IUserRepository, IVitalRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {GetVitalsDto} from 'domain/dtos/request/vital';
import {GetVitalsDto as GetVitalsResponseDto} from 'domain/dtos/response/vital/';

export class GetVitalsUseCase {
    constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly userRepository: IUserRepository,
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
        const patientUser = await this.userRepository.getOneByUserId(dto.userId);

        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(user, patientUser);
        const vitals = await this.vitalRepository.getByUserForInterval(dto.userId, dto.startDate, dto.endDate);

        return GetVitalsResponseDto.fromVitalsList(vitals);
    }
}
