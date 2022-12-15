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
import {PatientDiagnosisUseCasesFactory} from 'infrastructure/modules/patient-diagnosis/factories/patient-diagnosis-use-cases.factory';
import {CreateDiagnosisView} from 'presentation/views/request/patient-diagnosis/create-diagnosis.view';
import {DiagnosisDto} from 'domain/dtos/response/patient-diagnosis/diagnosis.dto';
import {DiagnosisView} from 'views/response/patient-diagnosis';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Diagnosis')
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

    @Roles('Caregiver', 'Doctor', 'Patient')
    @Get('patient-diagnoses/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [DiagnosisView]})
    public async getPatientDiagnoses(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<DiagnosisDto[]> {
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
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    public async deletePatientDiagnoses(@Param('diagnosisId', ParseUUIDPipe) diagnosisId: string): Promise<void> {
        const useCase = this.patientDiagnosisUseCasesFactory.createDeleteDiagnosisUseCase();

        try {
            await useCase.deleteDiagnosis(diagnosisId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
