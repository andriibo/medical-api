import {Body, Controller, Post, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/factories/patient-use-cases.factory';
import {InitiateDataAccessView} from 'views/patient';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Patient')
@Roles('Patient')
export class DataAccessController {
    constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Post('data-access/initiate')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async initiateDataAccess(@Body() requestBody: InitiateDataAccessView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createInitiateDataAccessUseCase();

        await useCase.initiateDataAccess(requestBody);
    }
}
