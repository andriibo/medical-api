import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {GetVitalsByGrantedUserDto} from 'domain/dtos/request/vital';
import {Roles} from 'presentation/guards';
import {GetVitalsQueryView} from 'presentation/views/request/vital';
import {VitalsView} from 'presentation/views/response/vital';
import {GrantedUserUseCasesFactory} from 'infrastructure/modules/vital/factories/granted-user-use-cases.factory';

@Controller()
@ApiBearerAuth()
@ApiTags('Vitals')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Get('/patient-vitals/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: VitalsView})
    public async getPatientVitals(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Query() query: GetVitalsQueryView,
    ): Promise<VitalsView> {
        const useCase = this.grantedUserUseCasesFactory.createPatientVitalsUseCase();

        try {
            return await useCase.getList(new GetVitalsByGrantedUserDto(query.startDate, query.endDate, patientUserId));
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
