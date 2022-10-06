import {IAuthService} from 'app/services/auth.service';
import {SignUpModel} from 'app/models';
import {IUserEntityMapper} from 'app/mappers/user-entity.mapper';
import {IUserRepository} from 'app/repositories/user.repository';
import {InitiateDataAccessDto} from 'domain/dtos/patient/initiate-data-access.dto';

export class InitiateDataAccessUseCase {
    constructor(
        private readonly authService: IAuthService,
        private readonly userRepository: IUserRepository,
        private readonly userEntityMapper: IUserEntityMapper,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<object> {
        const authModel = await this.authService.signUp(SignUpModel.fromCreateDoctorDto(dto));

        const user = this.userEntityMapper.mapByAuthModelAndCreateDoctorDto(authModel, dto);

        return user;
    }
}
