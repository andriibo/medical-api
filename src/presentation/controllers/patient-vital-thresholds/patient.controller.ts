import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PatientUseCasesFactory} from 'infrastructure/modules/patient-vital-thresholds/factories';
import {Roles} from 'presentation/guards';
import {PatientVitalThresholdsView} from 'views/response/patient-vital-thresholds/patient-vital-thresholds.view';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Patient Vital Thresholds')
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Get('my-vital-thresholds')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: PatientVitalThresholdsView})
    public async getVitalThresholds(): Promise<PatientVitalThresholdsDto> {
        const useCase = this.patientUseCasesFactory.createPatientVitalThresholdListUseCase();

        return await useCase.getList();
    }
}
