import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {
    UpdateHeartRateView,
    UpdateTemperatureView,
    UpdateRespirationRateView,
    UpdateOxygenSaturationView,
    UpdateBloodPressureView,
    UpdateMeanArterialPressureView,
} from 'views/request/patient-vital-threshold';
import {DoctorUseCasesFactory} from 'infrastructure/factories/patient-vital-threshold/doctor-use-cases.factory';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';
import {ThresholdView} from 'views/response/patient-vital-threshold/threshold.view';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Patient Vital Threshold')
export class DoctorController {
    public constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Get('patient-vital-thresholds/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use GET "/patient-vital-thresholds/:patientUserId" instead.',
    })
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

    @Roles('Doctor')
    @Patch('blood-pressure/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateBloodPressure(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateBloodPressureView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createUpdateBloodPressureUseCase();

        try {
            await useCase.updateThreshold(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

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

    @Roles('Doctor')
    @Patch('mean-arterial-pressure/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateMeanArterialPressure(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateMeanArterialPressureView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createUpdateMeanArterialPressureUseCase();

        try {
            await useCase.updateThreshold(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Patch('oxygen-saturation/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateOxygenSaturation(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateOxygenSaturationView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createUpdateOxygenSaturationUseCase();

        try {
            await useCase.updateThreshold(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Patch('respiration-rate/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateRespirationRate(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateRespirationRateView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createUpdateRespirationRateUseCase();

        try {
            await useCase.updateThreshold(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Patch('temperature/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateTemperature(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Body() requestBody: UpdateTemperatureView,
    ): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createUpdateTemperatureUseCase();

        try {
            await useCase.updateThreshold(patientUserId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
