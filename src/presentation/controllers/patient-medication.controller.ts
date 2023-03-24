import {
    Body,
    Controller,
    Post,
    HttpStatus,
    BadRequestException,
    Get,
    Delete,
    Param,
    ParseUUIDPipe,
    HttpCode,
} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientMedicationUseCasesFactory} from 'infrastructure/modules/patient-medication/factories/patient-medication-use-cases.factory';
import {CreateMedicationView} from 'presentation/views/request/patient-medication/create-medication.view';
import {MedicationDto} from 'domain/dtos/response/patient-medication/medication.dto';
import {PatientMedicationView} from 'views/response/patient-medication';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Medication')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientMedicationController {
    public constructor(private readonly patientMedicationUseCasesFactory: PatientMedicationUseCasesFactory) {}

    @Roles('Doctor', 'Patient')
    @Post('patient-medication')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.CREATED})
    public async createPatientMedication(@Body() requestBody: CreateMedicationView): Promise<void> {
        const useCase = this.patientMedicationUseCasesFactory.createCreateMedicationUseCase();

        try {
            await useCase.createMedication(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor', 'Patient')
    @Get('patient-medications/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [PatientMedicationView]})
    public async getPatientMedications(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<MedicationDto[]> {
        const useCase = this.patientMedicationUseCasesFactory.createMedicationListUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor', 'Patient')
    @Delete('patient-medication/:medicationId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No Content.'})
    public async deletePatientMedication(@Param('medicationId', ParseUUIDPipe) medicationId: string): Promise<void> {
        const useCase = this.patientMedicationUseCasesFactory.createDeleteMedicationUseCase();

        try {
            await useCase.deleteMedication(medicationId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
