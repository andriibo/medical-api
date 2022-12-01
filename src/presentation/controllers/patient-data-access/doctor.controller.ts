import {Controller, HttpStatus, Delete, BadRequestException, Param, ParseUUIDPipe, HttpCode} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorUseCasesFactory} from 'infrastructure/factories/patient-data-access/doctor-use-cases.factory';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Patient Data Access')
export class DoctorController {
    public constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

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
