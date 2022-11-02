import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PatientUseCasesFactory} from 'infrastructure/factories/patient-vital-threshold';
import {Roles} from 'presentation/guards';
import {ThresholdView} from 'views/response/patient-vital-threshold/threshold.view';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Patient Vital Threshold')
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Get('my-vital-thresholds')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [ThresholdView]})
    public async getVitalThresholds(): Promise<ThresholdDto[]> {
        const useCase = this.patientUseCasesFactory.createPatientVitalThresholdListUseCase();

        return await useCase.getList();
    }
}
