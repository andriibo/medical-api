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
    HttpCode,
    Patch,
} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/modules/patient-data-access/factories/patient-use-cases.factory';
import {InitiateDataAccessView} from 'presentation/views/request/data-access';
import {DataAccessView} from 'presentation/views/response/data-access';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';
import {TrimPipe} from 'presentation/pipes/trim.pipe';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Patient Data Access')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Post('data-access/initiate-for-doctor')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.CREATED})
    public async initiateDoctorDataAccess(@Body(TrimPipe) requestBody: InitiateDataAccessView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createInitiateDataAccessForDoctorUseCase();

        try {
            await useCase.initiateDataAccess(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Post('data-access/initiate-for-caregiver')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.CREATED})
    public async initiateCaregiverDataAccess(@Body(TrimPipe) requestBody: InitiateDataAccessView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createInitiateDataAccessForCaregiverUseCase();

        try {
            await useCase.initiateDataAccess(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Patch('data-access/refuse/:accessId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async refuseDataAccess(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createRefuseDataAccessUseCase();

        try {
            await useCase.refuseDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Patch('data-access/approve/:accessId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async approveDataAccess(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createApproveDataAccessUseCase();

        try {
            await useCase.approveDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get('data-accesses')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async getDataAccesses(): Promise<DataAccessDto[]> {
        const useCase = this.patientUseCasesFactory.createDataAccessListUseCase();

        return await useCase.getList();
    }

    @Roles('Patient')
    @Delete('data-access/:accessId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No Content.'})
    public async deleteDataAccess(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeleteDataAccessUseCase();

        try {
            await useCase.deleteDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
