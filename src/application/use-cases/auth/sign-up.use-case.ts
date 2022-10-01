import {Inject, Injectable} from '@nestjs/common';
import {IAuthService} from 'app/abstractions/services/auth.service';
import {SignUpModel} from 'app/abstractions/models';
import {UserEntityFactory} from 'app/factories/user-entity.factory';
import {IUserRepository} from 'app/abstractions/repositories/user.repository';
import {CreateDoctorDto} from 'domain/dtos/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/create-patient.dto';

@Injectable()
export class SignUpUseCase {
    constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        private readonly userEntityFactory: UserEntityFactory,
    ) {}

    public async signUpDoctor(dto: CreateDoctorDto): Promise<object> {
        // await this.authService.signUp(SignUpModel.fromCreateDoctorDto(dto));

        const user = this.userEntityFactory.createDoctorByCreateDoctorDto(dto);

        return await this.userRepository.create(user);
    }

    public async signUpPatient(dto: CreatePatientDto): Promise<object> {
        // await this.authService.signUp(SignUpModel.fromCreatePatientDto(dto));

        const user = this.userEntityFactory.createPatientByCreatePatientDto(dto);

        return await this.userRepository.create(user);
    }
}
