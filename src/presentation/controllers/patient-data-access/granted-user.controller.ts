import {
    Controller,
    HttpStatus,
    BadRequestException,
    HttpCode,
    Post,
    Body,
    Patch,
    Param,
    ParseUUIDPipe,
    Get,
    Delete,
} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {InitiateDataAccessView} from 'views/request/data-access';
import {GrantedUserUseCasesFactory} from 'infrastructure/modules/patient-data-access/factories/granted-user-use-cases.factory';
import {DataAccessView} from 'views/response/data-access';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Data Access')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Post('data-access/initiate')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.CREATED})
    public async initiateDataAccess(@Body() requestBody: InitiateDataAccessView): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createInitiateDataAccessUseCase();

        try {
            await useCase.initiateDataAccess(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Patch('data-access/refuse/:accessId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async refuseDataAccess(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createRefuseDataAccessUseCase();

        try {
            await useCase.refuseDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Patch('data-access/approve/:accessId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async approveDataAccess(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createApproveDataAccessUseCase();

        try {
            await useCase.approveDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Get('data-accesses')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async getDataAccesses(): Promise<DataAccessDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createDataAccessListUseCase();

        return await useCase.getList();
    }

    @Roles('Caregiver', 'Doctor')
    @Delete('data-access/:accessId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No Content.'})
    public async deleteDataAccess(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createDeleteDataAccessUseCase();

        try {
            await useCase.deleteDataAccess(accessId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
