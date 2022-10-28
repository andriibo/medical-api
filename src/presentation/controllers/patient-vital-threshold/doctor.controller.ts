import {BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {UpdateHeartRateView} from 'views/request/patient-vital-threshold';
import {DoctorUseCasesFactory} from 'infrastructure/factories/patient-vital-threshold/doctor-use-cases.factory';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Patient Vital Threshold')
export class DoctorController {
    public constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Patch('heart-rate/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateHeartRate(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateHeartRateView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createUpdateHeartRateUseCase();

        try {
            await useCase.updateThreshold(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
