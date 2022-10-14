import {
    Controller,
    HttpCode,
    HttpStatus,
    Get,
    Patch,
    Delete,
    Body,
    BadRequestException,
    Param,
    ParseUUIDPipe,
} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorUseCasesFactory} from 'infrastructure/factories/patient-data-access/doctor-use-cases.factory';
import {DataAccessView} from 'views/data-access';

@Controller('doctor/data-access')
@ApiBearerAuth()
@ApiTags('Patient Data Access')
export class DoctorController {
    constructor(private readonly useCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async list(): Promise<DataAccessView[]> {
        const useCase = this.useCasesFactory.createDataAccessListUseCase();

        return await useCase.getList();
    }

    @Roles('Doctor')
    @Patch('refuse/:accessId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async refuse(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.useCasesFactory.createRefuseDataAccessUseCase();

        try {
            await useCase.refuseDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Patch('approve/:accessId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async approve(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.useCasesFactory.createApproveDataAccessUseCase();

        try {
            await useCase.approveDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Doctor')
    @Delete(':accessId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async delete(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.useCasesFactory.createDeleteDataAccessUseCase();

        try {
            await useCase.deleteDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
