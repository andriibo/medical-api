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
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {InitiateDataAccessView} from 'views/request/data-access';
import {GrantedUserUseCasesFactory} from 'infrastructure/factories/patient-data-access/granted-user-use-cases.factory';
import {DataAccessView} from 'views/response/data-access';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient Data Access')
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Doctor')
    @Post('doctor/data-access/initiate')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use GET "/data-access/initiate" instead.',
    })
    @ApiResponse({status: HttpStatus.CREATED})
    public async initiateDataAccessDeprecated(@Body() requestBody: InitiateDataAccessView): Promise<void> {
        await this.initiateDataAccess(requestBody);
    }

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

    @Roles('Doctor')
    @Patch('doctor/data-access/refuse/:accessId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use GET "/data-access/refuse/{accessId}" instead.',
    })
    @ApiResponse({status: HttpStatus.OK})
    public async refuseDataAccessDeprecated(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        return await this.refuseDataAccess(accessId);
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

    @Roles('Doctor')
    @Patch('doctor/data-access/approve/:accessId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use GET "/data-access/approve/{accessId}" instead.',
    })
    @ApiResponse({status: HttpStatus.OK})
    public async approveDataAccessDeprecated(@Param('accessId', ParseUUIDPipe) accessId: string): Promise<void> {
        return await this.approveDataAccess(accessId);
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

    @Roles('Doctor')
    @Get('doctor/data-accesses')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use GET "/data-access" instead.',
    })
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async getDataAccessesDeprecated(): Promise<DataAccessDto[]> {
        return await this.getDataAccesses();
    }

    @Roles('Caregiver', 'Doctor')
    @Get('data-accesses')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [DataAccessView]})
    public async getDataAccesses(): Promise<DataAccessDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createDataAccessListUseCase();

        return await useCase.getList();
    }
}
