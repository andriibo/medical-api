import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientVitalThresholdsView} from 'views/response/patient-vital-threshold/patient-vital-thresholds.view';
import {GrantedUserUseCasesFactory} from 'infrastructure/modules/patient-vital-thresholds/factories';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-threshold/patient-vital-thresholds.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Vital Threshold')
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Doctor')
    @Get('doctor/patient-vital-thresholds/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use GET "/patient-vital-thresholds/{patientUserId}" instead.',
    })
    @ApiResponse({status: HttpStatus.OK, type: [PatientVitalThresholdsView]})
    public async getVitalThresholdsDeprecated(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<PatientVitalThresholdsDto> {
        return await this.getVitalThresholds(patientUserId);
    }

    @Roles('Caregiver', 'Doctor')
    @Get('patient-vital-thresholds/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: [PatientVitalThresholdsView]})
    public async getVitalThresholds(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<PatientVitalThresholdsDto> {
        const useCase = this.grantedUserUseCasesFactory.createPatientVitalThresholdListUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
