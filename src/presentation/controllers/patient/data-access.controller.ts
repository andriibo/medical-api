import {Body, Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/factories/patient-use-cases.factory';
import {InitiateDataAccessView} from 'views/patient';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient')
export class DataAccessController {
    constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Get('patient/data-access/initiate')
    @Roles('Patient')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async initiateDataAccess(@Body() requestBody: InitiateDataAccessView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createInitiateDataAccessUseCase();

        await useCase.initiateDataAccess(requestBody);
    }
}
