import {Controller, HttpStatus, Get, HttpCode} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Auth} from 'presentation/guards';
import {MedicationUseCasesFactory} from 'infrastructure/factories/medication-use-cases.factory';
import {MedicationDto} from 'domain/dtos/response/medication/medication.dto';
import {MedicationView} from 'views/response/medication';

@Controller()
@ApiBearerAuth()
@ApiTags('Medication')
export class MedicationController {
    public constructor(private readonly medicationUseCasesFactory: MedicationUseCasesFactory) {}

    @Auth()
    @Get('medication')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({deprecated: true, summary: 'Deprecated endpoint. Use GET "/medications" instead.'})
    @ApiResponse({status: HttpStatus.OK, type: [MedicationView]})
    public async getMedicationsDeprecated(): Promise<MedicationDto[]> {
        return await this.getMedications();
    }

    @Auth()
    @Get('medications')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [MedicationView]})
    public async getMedications(): Promise<MedicationDto[]> {
        const useCase = this.medicationUseCasesFactory.createMedicationListUseCase();

        return await useCase.getList();
    }
}
