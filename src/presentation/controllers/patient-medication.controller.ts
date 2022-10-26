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
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientMedicationUseCasesFactory} from 'infrastructure/factories/patient-medication-use-cases.factory';
import {CreateMedicationView} from 'presentation/views/request/patient-medication/create-medication.view';
import {MedicationDto} from 'domain/dtos/response/patient-medication/medication.dto';
import {MedicationView} from 'views/response/patient-medication';

@Controller('patient-medication')
@ApiBearerAuth()
@ApiTags('Patient Medication')
export class PatientMedicationController {
    public constructor(private readonly patientMedicationUseCasesFactory: PatientMedicationUseCasesFactory) {}

    @Roles('Doctor', 'Patient')
    @Post()
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

    @Roles('Doctor', 'Patient')
    @Get(':patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [MedicationView]})
    public async getPatientDiagnoses(
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
    @Delete(':medicationId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    public async deletePatientDiagnoses(@Param('medicationId', ParseUUIDPipe) medicationId: string): Promise<void> {
        const useCase = this.patientMedicationUseCasesFactory.createDeleteMedicationUseCase();

        try {
            await useCase.deleteMedication(medicationId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
