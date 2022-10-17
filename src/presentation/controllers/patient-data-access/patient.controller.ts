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
} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/factories/patient-data-access/patient-use-cases.factory';
import {InitiateDataAccessView} from 'presentation/views/request/data-access';
import {DataAccessView} from 'presentation/views/response/data-access';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';

@Controller('patient/data-access')
@ApiBearerAuth()
@ApiTags('Patient Data Access')
export class PatientController {
    constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Post('initiate')
    public async initiate(@Body() requestBody: InitiateDataAccessView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createInitiateDataAccessUseCase();

        try {
            await useCase.initiateDataAccess(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get()
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async list(): Promise<DataAccessDto[]> {
        const useCase = this.patientUseCasesFactory.createDataAccessListUseCase();

        return await useCase.getList();
    }

    @Roles('Patient')
    @Delete(':accessId')
    public async delete(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeleteDataAccessUseCase();

        try {
            await useCase.deleteDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
