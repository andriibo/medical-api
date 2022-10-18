import {Body, Controller, Get, HttpStatus, Patch} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientView} from 'presentation/views/response/user';
import {PatientUseCasesFactory} from 'infrastructure/factories/profile';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {UpdatePatientProfileView} from 'views/request/profile/update-patient-profile.view';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Profile')
export class PatientController {
    constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Get('my-profile')
    @ApiResponse({status: HttpStatus.OK, type: PatientView})
    public async getMyProfile(): Promise<PatientDto> {
        const useCase = this.patientUseCasesFactory.createGetPatientProfileUseCase();

        return await useCase.getProfileInfo();
    }

    @Roles('Patient')
    @Patch('my-profile')
    @ApiResponse({status: HttpStatus.OK})
    public async updateMyProfile(@Body() requestBody: UpdatePatientProfileView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createUpdatePatientProfileUseCase();

        await useCase.updateProfileInfo(requestBody);
    }
}
