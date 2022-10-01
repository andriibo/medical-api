import {IAuthService} from 'app/abstractions/services/auth.service';
import {SignUpModel} from 'app/abstractions/models';
import {IUserEntityMapper} from 'app/abstractions/mappers/user-entity.mapper';
import {IUserRepository} from 'app/abstractions/repositories/user.repository';
import {CreateDoctorDto} from 'domain/dtos/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/create-patient.dto';

export class SignUpUseCase {
    constructor(
        private readonly authService: IAuthService,
        private readonly userRepository: IUserRepository,
        private readonly userEntityMapper: IUserEntityMapper,
    ) {}

    public async signUpDoctor(dto: CreateDoctorDto): Promise<object> {
        // await this.authService.signUp(SignUpModel.fromCreateDoctorDto(dto));

        const user = this.userEntityMapper.mapDoctorByCreateDoctorDto(dto);

        return await this.userRepository.create(user);
    }

    public async signUpPatient(dto: CreatePatientDto): Promise<object> {
        // await this.authService.signUp(SignUpModel.fromCreatePatientDto(dto));

        const user = this.userEntityMapper.mapPatientByCreatePatientDto(dto);

        return await this.userRepository.create(user);
    }
}
