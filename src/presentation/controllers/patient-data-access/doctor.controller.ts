import {Controller, HttpStatus, Get, Patch, Delete, BadRequestException, Param, ParseUUIDPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorUseCasesFactory} from 'infrastructure/factories/patient-data-access/doctor-use-cases.factory';
import {DataAccessView} from 'presentation/views/response/data-access';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';

@Controller('doctor/data-access')
@ApiBearerAuth()
@ApiTags('Patient Data Access')
export class DoctorController {
    constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Get()
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async list(): Promise<DataAccessDto[]> {
        const useCase = this.doctorUseCasesFactory.createDataAccessListUseCase();

        return await useCase.getList();
    }

    @Roles('Doctor')
    @Patch('refuse/:accessId')
    public async refuse(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createRefuseDataAccessUseCase();

        try {
            await useCase.refuseDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Patch('approve/:accessId')
    public async approve(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createApproveDataAccessUseCase();

        try {
            await useCase.approveDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Delete(':accessId')
    public async delete(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createDeleteDataAccessUseCase();

        try {
            await useCase.deleteDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
