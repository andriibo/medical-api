import {Controller, HttpStatus, Get, Delete, BadRequestException, Param, ParseUUIDPipe, HttpCode} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorUseCasesFactory} from 'infrastructure/factories/patient-data-access/doctor-use-cases.factory';
import {DataAccessView} from 'presentation/views/response/data-access';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Patient Data Access')
export class DoctorController {
    public constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Get('data-accesses')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async getDataAccesses(): Promise<DataAccessDto[]> {
        const useCase = this.doctorUseCasesFactory.createDataAccessListUseCase();

        return await useCase.getList();
    }

    @Roles('Doctor')
    @Delete('data-access/:accessId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    public async deleteDataAccess(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createDeleteDataAccessUseCase();

        try {
            await useCase.deleteDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
