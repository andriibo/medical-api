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
    Patch,
} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientDiagnosisUseCasesFactory} from 'infrastructure/modules/patient-diagnosis/factories/patient-diagnosis-use-cases.factory';
import {CreateDiagnosisView, UpdateDiagnosisView} from 'presentation/views/request/patient-diagnosis';
import {PatientDiagnosisDto} from 'domain/dtos/response/patient-diagnosis/patient-diagnosis.dto';
import {PatientDiagnosisView} from 'views/response/patient-diagnosis';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Diagnosis')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientDiagnosisController {
    public constructor(private readonly patientDiagnosisUseCasesFactory: PatientDiagnosisUseCasesFactory) {}

    @Roles('Doctor', 'Patient')
    @Post('patient-diagnosis')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.CREATED})
    public async createPatientDiagnosis(@Body() requestBody: CreateDiagnosisView): Promise<void> {
        const useCase = this.patientDiagnosisUseCasesFactory.createCreateDiagnosisUseCase();

        try {
            await useCase.createDiagnosis(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor', 'Patient')
    @Patch('patient-diagnosis/:diagnosisId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updatePatientDiagnosis(
        @Param('diagnosisId', ParseUUIDPipe) diagnosisId: string,
        @Body() requestBody: UpdateDiagnosisView,
    ): Promise<void> {
        const useCase = this.patientDiagnosisUseCasesFactory.updateCreateDiagnosisUseCase();

        try {
            await useCase.updateDiagnosis(diagnosisId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor', 'Patient')
    @Get('patient-diagnoses/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [PatientDiagnosisView]})
    public async getPatientDiagnoses(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<PatientDiagnosisDto[]> {
        const useCase = this.patientDiagnosisUseCasesFactory.createDiagnosisListUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor', 'Patient')
    @Delete('patient-diagnosis/:diagnosisId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No Content.'})
    public async deletePatientDiagnoses(@Param('diagnosisId', ParseUUIDPipe) diagnosisId: string): Promise<void> {
        const useCase = this.patientDiagnosisUseCasesFactory.createDeleteDiagnosisUseCase();

        try {
            await useCase.deleteDiagnosis(diagnosisId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
