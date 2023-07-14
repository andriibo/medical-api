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

    @Roles('Patient')
    @Get('patient/my-status')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: PatientStatusView})
    @ApiOperation({deprecated: true, summary: 'use GET /patient-status/:patientUserId'})
    public async getMyPatientStatus(): Promise<PatientStatusDto> {
        const useCase = this.patientStatusUseCasesFactory.createMyPatientStatusUseCase();

        return await useCase.getMyPatientStatus();
    }

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

    @Roles('Patient')
    @Put('patient/my-status/normal')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    @ApiOperation({deprecated: true})
    public async deprecatedSetPatientStatusNormal(): Promise<void> {
        const useCase = this.patientStatusUseCasesFactory.createMyPatientStatusNormalUseCase();
        await useCase.setStatusNormal();
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

    @Roles('Patient')
    @Put('patient/my-status/abnormal')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    @ApiOperation({deprecated: true})
    public async deprecatedSetPatientStatusAbnormal(): Promise<void> {
        const useCase = this.patientStatusUseCasesFactory.createMyPatientStatusAbnormalUseCase();
        await useCase.setStatusAbnormal();
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
