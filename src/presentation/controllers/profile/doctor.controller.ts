import {Controller, Get, Patch, HttpStatus, Body} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorView} from 'presentation/views/response/user';
import {DoctorUseCasesFactory} from 'infrastructure/factories/profile';
import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';
import {UpdateDoctorProfileView} from 'views/request/profile/update-doctor-profile.view';

@Controller('doctor/profile')
@ApiBearerAuth()
@ApiTags('Profile')
export class DoctorController {
    constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Get()
    @ApiResponse({status: HttpStatus.OK, type: DoctorView})
    public async get(): Promise<DoctorDto> {
        const useCase = this.doctorUseCasesFactory.createGetDoctorProfileUseCase();

        return await useCase.getProfileInfo();
    }

    @Roles('Doctor')
    @Patch()
    @ApiResponse({status: HttpStatus.OK})
    public async update(@Body() requestBody: UpdateDoctorProfileView): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createUpdateDoctorProfileUseCase();

        await useCase.updateProfileInfo(requestBody);
    }
}
