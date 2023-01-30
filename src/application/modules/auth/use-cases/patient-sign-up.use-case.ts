import {IAuthService} from 'app/modules/auth/services/auth.service';
import {SignUpModel} from 'app/modules/auth/models';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {User} from 'domain/entities';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';

export class PatientSignUpUseCase {
    public constructor(
        private readonly authService: IAuthService,
        private readonly userRepository: IUserRepository,
        private readonly userEntityMapper: IUserEntityMapper,
        private readonly patientVitalThresholdsEntityMapper: IPatientVitalThresholdsEntityMapper,
        private readonly authEventEmitter: IAuthEventEmitter,
    ) {}

    public async signUp(dto: CreatePatientDto): Promise<void> {
        const authModel = await this.authService.signUp(SignUpModel.fromCreatePatientDto(dto));

        const patient = this.userEntityMapper.mapByAuthModelAndCreatePatientDto(authModel, dto);
        const vitalThresholds = this.patientVitalThresholdsEntityMapper.mapDefaultByPatient(patient);

        const createdUser = await this.createPatient(patient, vitalThresholds);

        await this.authEventEmitter.emitPatientCreated(createdUser);
    }

    private async createPatient(patient: User, vitalThresholds): Promise<User> {
        try {
            return await this.userRepository.insertPatient(patient, vitalThresholds);
        } catch (error) {
            await this.authService.deleteUser(patient);

            throw error;
        }
    }
}
