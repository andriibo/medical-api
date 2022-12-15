import {Controller, HttpStatus, Get, HttpCode} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Auth} from 'presentation/guards';
import {DiagnosisUseCasesFactory} from 'infrastructure/modules/diagnosis/factories/diagnosis-use-cases.factory';
import {DiagnosisView} from 'views/response/diagnosis';
import {DiagnosisDto} from 'domain/dtos/response/diagnosis/diagnosis.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Diagnoses')
export class DiagnosisController {
    public constructor(private readonly diagnosisUseCasesFactory: DiagnosisUseCasesFactory) {}

    @Auth()
    @Get('diagnoses')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [DiagnosisView]})
    public async getDiagnoses(): Promise<DiagnosisDto[]> {
        const useCase = this.diagnosisUseCasesFactory.createDiagnosisListUseCase();

        return await useCase.getList();
    }
}
