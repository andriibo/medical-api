import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorUseCasesFactory} from 'infrastructure/factories/patient-vital-threshold/doctor-use-cases.factory';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';
import {ThresholdView} from 'views/response/patient-vital-threshold/threshold.view';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Vital Threshold')
export class GrantedUserController {
    public constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Get('/patient-vital-thresholds/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: [ThresholdView]})
    public async getVitalThresholds(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<ThresholdDto[]> {
        const useCase = this.doctorUseCasesFactory.createPatientVitalThresholdListUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
