import {IAuthService} from 'app/modules/auth/services/auth.service';
import {SignUpModel} from 'app/modules/auth/models';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';
import {CreateDoctorDto} from 'domain/dtos/request/auth/create-doctor.dto';
import {User} from 'domain/entities';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';
import {CreateCaregiverDto} from 'domain/dtos/request/auth/create-caregiver.dto';

export class SignUpUseCase {
    public constructor(
        private readonly authService: IAuthService,
        private readonly userRepository: IUserRepository,
        private readonly userEntityMapper: IUserEntityMapper,
        private readonly authEventEmitter: IAuthEventEmitter,
    ) {}

    public async signUpDoctor(dto: CreateDoctorDto): Promise<void> {
        const authModel = await this.authService.signUp(SignUpModel.fromCreateDoctorDto(dto));

        const user = this.userEntityMapper.mapByAuthModelAndCreateDoctorDto(authModel, dto);

        const createdUser = await this.createUser(user);

        await this.authEventEmitter.emitDoctorCreated(createdUser);
    }

    public async signUpCaregiver(dto: CreateCaregiverDto): Promise<void> {
        const authModel = await this.authService.signUp(SignUpModel.fromCreateCaregiverDto(dto));

        const user = this.userEntityMapper.mapByAuthModelAndCreateCaregiverDto(authModel, dto);

        const createdUser = await this.createUser(user);

        await this.authEventEmitter.emitCaregiverCreated(createdUser);
    }

    private async createUser(user: User): Promise<User> {
        try {
            return await this.userRepository.persist(user);
        } catch (error) {
            await this.authService.deleteUser(user);

            throw error;
        }
    }
}
