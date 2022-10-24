import {Controller, HttpStatus, Get, HttpCode} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Auth} from 'presentation/guards';
import {DiagnosisUseCasesFactory} from 'infrastructure/factories/diagnosis-use-cases.factory';

@Controller('diagnosis')
@ApiBearerAuth()
@ApiTags('Diagnosis')
export class DiagnosisController {
    public constructor(private readonly diagnosisUseCasesFactory: DiagnosisUseCasesFactory) {}

    @Auth()
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [String]})
    public async getDiagnoses(): Promise<string[]> {
        const useCase = this.diagnosisUseCasesFactory.createDiagnosisListUseCase();

        return await useCase.getList();
    }
}
