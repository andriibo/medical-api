import {Body, Controller, Post, HttpCode, HttpStatus, BadRequestException, Get, Delete} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/factories/patient-data-access/patient-use-cases.factory';
import {InitiateDataAccessView, DeleteDataAccessView, DataAccessView} from 'views/data-access';

@Controller('patient/data-access')
@ApiBearerAuth()
@ApiTags('Patient Data Access')
export class PatientController {
    constructor(private readonly useCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Post('initiate')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async initiate(@Body() requestBody: InitiateDataAccessView): Promise<void> {
        const useCase = this.useCasesFactory.createInitiateDataAccessUseCase();

        try {
            await useCase.initiateDataAccess(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async list(): Promise<DataAccessView[]> {
        const useCase = this.useCasesFactory.createDataAccessListUseCase();

        return await useCase.getList();
    }

    @Roles('Patient')
    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async delete(@Body() requestBody: DeleteDataAccessView): Promise<void> {
        const useCase = this.useCasesFactory.createDeleteDataAccessUseCase();

        try {
            await useCase.deleteDataAccess(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
