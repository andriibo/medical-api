import {Body, Controller, Get, HttpCode, HttpStatus, Patch} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientView} from 'presentation/views/response/user';
import {PatientUseCasesFactory} from 'infrastructure/modules/profile/factories';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {UpdatePatientProfileView} from 'views/request/profile/update-patient-profile.view';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';
import {MyDoctorView} from 'views/response/profile';
import {MyCaregiverView} from 'views/response/profile/my-caregiver.view';
import {MyCaregiverDto} from 'domain/dtos/response/profile/my-caregiver.dto';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Profile')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Get('my-profile')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: PatientView})
    public async getMyProfile(): Promise<PatientDto> {
        const useCase = this.patientUseCasesFactory.createGetPatientProfileUseCase();

        return await useCase.getProfileInfo();
    }

    @Roles('Patient')
    @Patch('my-profile')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async updateMyProfile(@Body() requestBody: UpdatePatientProfileView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createUpdatePatientProfileUseCase();

        await useCase.updateProfileInfo(requestBody);
    }

    @Roles('Patient')
    @Get('my-doctors')
    @ApiResponse({status: HttpStatus.OK, type: [MyDoctorView]})
    public async getMyDoctors(): Promise<MyDoctorDto[]> {
        const useCase = this.patientUseCasesFactory.createDoctorListUseCase();

        return await useCase.getMyDoctorList();
    }

    @Roles('Patient')
    @Get('my-caregivers')
    @ApiResponse({status: HttpStatus.OK, type: [MyCaregiverView]})
    public async getMyCaregivers(): Promise<MyCaregiverDto[]> {
        const useCase = this.patientUseCasesFactory.createCaregiverListUseCase();

        return await useCase.getMyCaregiverList();
    }
}
