import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';
import {ThresholdView} from 'views/response/patient-vital-threshold/threshold.view';
import {GrantedUserUseCasesFactory} from 'infrastructure/factories/patient-vital-threshold/granted-user-use-cases.factory';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Vital Threshold')
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Get('/patient-vital-thresholds/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: [ThresholdView]})
    public async getVitalThresholds(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<ThresholdDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createPatientVitalThresholdListUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
