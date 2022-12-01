import {
    Controller,
    Get,
    Patch,
    HttpStatus,
    Body,
    Param,
    ParseUUIDPipe,
    HttpCode,
    BadRequestException,
} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorView} from 'presentation/views/response/user';
import {DoctorUseCasesFactory} from 'infrastructure/factories/profile';
import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {UpdateDoctorProfileView} from 'views/request/profile/update-doctor-profile.view';
import {MyPatientView} from 'views/response/profile/my-patient.view';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {PatientView} from 'presentation/views/response/user';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Profile')
export class DoctorController {
    public constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Get('my-profile')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: DoctorView})
    public async getMyProfile(): Promise<DoctorDto> {
        const useCase = this.doctorUseCasesFactory.createGetDoctorProfileUseCase();

        return await useCase.getProfileInfo();
    }

    @Roles('Doctor')
    @Patch('my-profile')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async updateMyProfile(@Body() requestBody: UpdateDoctorProfileView): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createUpdateDoctorProfileUseCase();

        await useCase.updateProfileInfo(requestBody);
    }

    @Roles('Doctor')
    @Get('patient-profile/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: PatientView})
    public async getPatientProfile(@Param('patientUserId', ParseUUIDPipe) patientUserId: string): Promise<PatientDto> {
        const useCase = this.doctorUseCasesFactory.createGetPatientProfileUseCase();

        try {
            return await useCase.getProfileInfo(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Get('my-patients')
    @ApiResponse({status: HttpStatus.OK, type: [MyPatientView]})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    public async getMyPatients(): Promise<MyPatientDto[]> {
        const useCase = this.doctorUseCasesFactory.createPatientListUseCase();

        return await useCase.getMyPatientList();
    }
}
