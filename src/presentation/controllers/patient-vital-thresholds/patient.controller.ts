import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {PatientUseCasesFactory} from 'infrastructure/modules/patient-vital-thresholds/factories';
import {Roles} from 'presentation/guards';
import {CurrentPatientVitalThresholdsView} from 'views/response/patient-vital-thresholds/current-patient-vital-thresholds.view';
import {CurrentPatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/current-patient-vital-thresholds.dto';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Patient Vital Thresholds')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Get('my-vital-thresholds')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: CurrentPatientVitalThresholdsView})
    public async getVitalThresholds(): Promise<CurrentPatientVitalThresholdsDto> {
        const useCase = this.patientUseCasesFactory.createPatientVitalThresholdListUseCase();

        return await useCase.getList();
    }
}
