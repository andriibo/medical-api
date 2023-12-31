import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {GrantedUserUseCasesFactory} from 'infrastructure/modules/patient-vital-thresholds/factories';
import {CurrentPatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/current-patient-vital-thresholds.dto';
import {CurrentPatientVitalThresholdsView} from 'views/response/patient-vital-thresholds/current-patient-vital-thresholds.view';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Vital Thresholds')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Get('patient-vital-thresholds/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: CurrentPatientVitalThresholdsView})
    public async getVitalThresholds(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<CurrentPatientVitalThresholdsDto> {
        const useCase = this.grantedUserUseCasesFactory.createPatientVitalThresholdListUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
