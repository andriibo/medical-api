import {Controller, HttpCode, HttpStatus, Get, Patch, Body, BadRequestException} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorUseCasesFactory} from 'infrastructure/factories/doctor-use-cases.factory';
import {DataAccessView} from 'views/patient/data-access.view';
import {ApproveDataAccessView, RefuseDataAccessView} from 'views/data-access';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Doctor')
export class DataAccessController {
    constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Get('data-access/list')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async list(): Promise<DataAccessView[]> {
        const useCase = this.doctorUseCasesFactory.createDataAccessListUseCase();

        return await useCase.getList();
    }

    @Roles('Doctor')
    @Patch('data-access/refuse')
    @HttpCode(HttpStatus.OK)
    public async refuse(@Body() requestBody: RefuseDataAccessView): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createRefuseDataAccessUseCase();

        try {
            await useCase.refuseDataAccess(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Patch('data-access/approve')
    @HttpCode(HttpStatus.OK)
    public async approve(@Body() requestBody: ApproveDataAccessView): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createApproveDataAccessUseCase();

        try {
            await useCase.approveDataAccess(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
