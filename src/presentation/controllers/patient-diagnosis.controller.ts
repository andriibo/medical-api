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
import {PatientDiagnosisUseCasesFactory} from 'infrastructure/factories/patient-diagnosis-use-cases.factory';
import {CreateDiagnosisView} from 'presentation/views/request/patient-diagnosis/create-diagnosis.view';

@Controller('patient-diagnosis')
@ApiBearerAuth()
@ApiTags('Patient Diagnosis')
export class PatientDiagnosisController {
    public constructor(private readonly patientDiagnosisUseCasesFactory: PatientDiagnosisUseCasesFactory) {}

    @Roles('Doctor', 'Patient')
    @Post()
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
    @Get(':patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [Object]})
    public async getPatientDiagnoses(@Param('patientUserId', ParseUUIDPipe) patientUserId: string): Promise<object[]> {
        return [];
    }

    @Roles('Doctor', 'Patient')
    @Delete(':patientDiagnosisId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    public async deletePatientDiagnoses(
        @Param('patientDiagnosisId', ParseUUIDPipe) patientDiagnosisId: string,
    ): Promise<void> {}
}
