import {Controller, HttpCode, HttpStatus, Get} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorUseCasesFactory} from 'infrastructure/factories/doctor-use-cases.factory';
import {DataAccessView} from 'views/patient/data-access.view';

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
}
