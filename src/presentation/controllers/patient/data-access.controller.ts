import {Body, Controller, Post, HttpCode, HttpStatus, Req} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/factories/patient-use-cases.factory';
import {InitiateDataAccessView} from 'views/patient';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Patient')
export class DataAccessController {
    constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Post('data-access/initiate')
    @Roles('Patient')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async initiateDataAccess(@Req() req, @Body() requestBody: InitiateDataAccessView): Promise<void> {
        console.log('req\n', req);
        const useCase = this.patientUseCasesFactory.createInitiateDataAccessUseCase();

        await useCase.initiateDataAccess(requestBody);
    }
}
