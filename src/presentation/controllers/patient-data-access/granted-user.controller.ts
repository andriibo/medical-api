import {Controller, HttpStatus, BadRequestException, HttpCode, Post, Body} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {InitiateDataAccessView} from 'views/request/data-access';
import {GrantedUserUseCasesFactory} from 'infrastructure/factories/patient-data-access/granted-user-use-cases.factory';

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
}
