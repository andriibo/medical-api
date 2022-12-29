import {BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {
    UpdateHeartRateView,
    UpdateTemperatureView,
    UpdateRespirationRateView,
    UpdateOxygenSaturationView,
    UpdateBloodPressureView,
    UpdateMeanArterialPressureView,
} from 'views/request/patient-vital-threshold';
import {DoctorUseCasesFactory} from 'infrastructure/modules/patient-vital-thresholds/factories/doctor-use-cases.factory';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Patient Vital Threshold')
export class DoctorController {
    public constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Post('blood-pressure/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateBloodPressure(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateBloodPressureView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createBloodPressureUseCase();

        try {
            await useCase.createNewThresholds(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Post('heart-rate/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateHeartRate(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateHeartRateView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createHeartRateUseCase();

        try {
            await useCase.createNewThresholds(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Post('mean-arterial-pressure/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateMeanArterialPressure(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateMeanArterialPressureView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createMeanArterialPressureUseCase();

        try {
            await useCase.createNewThresholds(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Post('oxygen-saturation/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateOxygenSaturation(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateOxygenSaturationView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createOxygenSaturationUseCase();

        try {
            await useCase.createNewThreshold(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Post('respiration-rate/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateRespirationRate(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateRespirationRateView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createRespirationRateUseCase();

        try {
            await useCase.createNewThresholds(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Post('temperature/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateTemperature(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateTemperatureView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createTemperatureUseCase();

        try {
            await useCase.createNewThresholds(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
