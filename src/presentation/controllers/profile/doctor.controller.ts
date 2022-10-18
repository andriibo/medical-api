import {Controller, Get, Patch, HttpStatus, Body, Param, ParseUUIDPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorView} from 'presentation/views/response/user';
import {PatientView} from 'presentation/views/response/user';
import {DoctorUseCasesFactory} from 'infrastructure/factories/profile';
import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {UpdateDoctorProfileView} from 'views/request/profile/update-doctor-profile.view';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Profile')
export class DoctorController {
    constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Get('my-profile')
    @ApiResponse({status: HttpStatus.OK, type: DoctorView})
    public async getMyProfile(): Promise<DoctorDto> {
        const useCase = this.doctorUseCasesFactory.createGetDoctorProfileUseCase();

        return await useCase.getProfileInfo();
    }

    @Roles('Doctor')
    @Patch('my-profile')
    @ApiResponse({status: HttpStatus.OK})
    public async updateMyProfile(@Body() requestBody: UpdateDoctorProfileView): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createUpdateDoctorProfileUseCase();

        await useCase.updateProfileInfo(requestBody);
    }

    @Roles('Doctor')
    @Get('patient-profile/:patientUserId')
    @ApiResponse({status: HttpStatus.OK, type: PatientView})
    public async getPatientProfile(@Param('patientUserId', ParseUUIDPipe) patientUserId: string): Promise<PatientDto> {
        const useCase = this.doctorUseCasesFactory.createGetPatientProfileUseCase();

        return await useCase.getProfileInfo(patientUserId);
    }
}
