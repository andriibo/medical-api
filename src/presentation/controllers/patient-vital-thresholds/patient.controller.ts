import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {PatientUseCasesFactory} from 'infrastructure/modules/patient-vital-thresholds/factories';
import {Roles} from 'presentation/guards';
import {ThresholdsView} from 'views/response/patient-vital-thresholds/patient-vital-thresholds.view';
import {ThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/thresholds.dto';

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
    @ApiResponse({status: HttpStatus.OK, type: ThresholdsView})
    public async getVitalThresholds(): Promise<ThresholdsDto> {
        const useCase = this.patientUseCasesFactory.createPatientVitalThresholdListUseCase();

        return await useCase.getList();
    }
}
