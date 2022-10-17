import {IAuthService} from 'app/services/auth.service';
import {SignUpModel} from 'app/models';
import {IUserEntityMapper} from 'app/mappers/user-entity.mapper';
import {IUserRepository} from 'app/repositories';
import {CreateDoctorDto} from 'domain/dtos/request/auth/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {User} from 'domain/entities';

export class SignUpUseCase {
    constructor(
        private readonly authService: IAuthService,
        private readonly userRepository: IUserRepository,
        private readonly userEntityMapper: IUserEntityMapper,
    ) {}

    public async signUpDoctor(dto: CreateDoctorDto): Promise<void> {
        const authModel = await this.authService.signUp(SignUpModel.fromCreateDoctorDto(dto));

        const user = this.userEntityMapper.mapByAuthModelAndCreateDoctorDto(authModel, dto);

        await this.createUser(user);
    }

    public async signUpPatient(dto: CreatePatientDto): Promise<void> {
        const authModel = await this.authService.signUp(SignUpModel.fromCreatePatientDto(dto));

        const user = this.userEntityMapper.mapByAuthModelAndCreatePatientDto(authModel, dto);

        await this.createUser(user);
    }

    private async createUser(user: User): Promise<void> {
        try {
            await this.userRepository.create(user);
        } catch (err) {
            await this.authService.deleteUser(user);

            throw err;
        }
    }
}
