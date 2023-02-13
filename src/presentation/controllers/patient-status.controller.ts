import {Controller, HttpStatus, Get, HttpCode, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientStatusUseCasesFactory} from 'infrastructure/modules/patient-status/factories/patient-status-use-cases.factory';
import {MyPatientStatusView} from 'views/response/patient-status';
import {MyPatientStatusDto} from 'domain/dtos/response/patient-status/my-patient-status.dto';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Patient Status')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientStatusController {
    public constructor(private readonly patientStatusUseCasesFactory: PatientStatusUseCasesFactory) {}

    @Roles('Patient')
    @Get('my-status')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: MyPatientStatusView})
    public async getMyPatientStatus(): Promise<MyPatientStatusDto> {
        const useCase = this.patientStatusUseCasesFactory.createMyPatientStatusUseCase();

        return await useCase.getMyPatientStatus();
    }

    @Roles('Patient')
    @Put('my-status/normal')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async setPatientStatusNormal(): Promise<void> {
        const useCase = this.patientStatusUseCasesFactory.createMyPatientStatusNormalUseCase();
        await useCase.setStatusNormal();
    }

    @Roles('Patient')
    @Put('my-status/abnormal')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async setPatientStatusAbnormal(): Promise<void> {
        const useCase = this.patientStatusUseCasesFactory.createMyPatientStatusAbnormalUseCase();
        await useCase.setStatusAbnormal();
    }
}
