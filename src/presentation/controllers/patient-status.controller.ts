import {Controller, HttpStatus, Get, HttpCode, Put, Param, ParseUUIDPipe} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiOperation,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientStatusUseCasesFactory} from 'infrastructure/modules/patient-status/factories/patient-status-use-cases.factory';
import {PatientStatusView} from 'views/response/patient-status';
import {PatientStatusDto} from 'domain/dtos/response/patient-status/patient-status.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Status')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientStatusController {
    public constructor(private readonly patientStatusUseCasesFactory: PatientStatusUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor', 'Patient')
    @Get('patient-status/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: PatientStatusView})
    public async getPatientStatus(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<PatientStatusDto> {
        const useCase = this.patientStatusUseCasesFactory.createGetPatientStatusUseCase();

        return await useCase.getPatientStatus(patientUserId);
    }

    @Roles('Caregiver', 'Doctor')
    @Put('patient-status/normal/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async setPatientStatusNormal(@Param('patientUserId', ParseUUIDPipe) patientUserId: string): Promise<void> {
        const useCase = this.patientStatusUseCasesFactory.createPatientStatusNormalUseCase();
        await useCase.setStatusNormal(patientUserId);
    }

    @Roles('Caregiver', 'Doctor')
    @Put('patient-status/borderline/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async setPatientStatusBorderline(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<void> {
        const useCase = this.patientStatusUseCasesFactory.createPatientStatusBorderlineUseCase();
        await useCase.setStatusBorderline(patientUserId);
    }

    @Roles('Caregiver', 'Doctor', 'Patient')
    @Put('patient-status/abnormal/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async setPatientStatusAbnormal(@Param('patientUserId', ParseUUIDPipe) patientUserId: string): Promise<void> {
        const useCase = this.patientStatusUseCasesFactory.createPatientStatusAbnormalUseCase();
        await useCase.setStatusAbnormal(patientUserId);
    }
}
