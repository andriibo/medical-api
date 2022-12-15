import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetVitalsByGrantedUserDto} from 'domain/dtos/request/vital';
import {VitalUseCasesFactory} from 'infrastructure/modules/vitals/factories/vital-use-cases.factory';
import {Roles} from 'presentation/guards';
import {GetVitalQueryView} from 'presentation/views/request/vital';
import {GetVitalsView} from 'presentation/views/response/vital';

@Controller()
@ApiBearerAuth()
@ApiTags('Vitals')
export class GrantedUserController {
    public constructor(private readonly useCasesFactory: VitalUseCasesFactory) {}

    @Roles('Doctor')
    @Get('doctor/:userId/vitals')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use GET "/patient-vitals/{patientUserId}" instead.',
    })
    @ApiResponse({status: HttpStatus.OK, type: GetVitalsView})
    public async getPatientVitalsDeprecated(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Query() query: GetVitalQueryView,
    ): Promise<GetVitalsView> {
        return await this.getPatientVitals(userId, query);
    }

    @Roles('Caregiver', 'Doctor')
    @Get('/patient-vitals/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: GetVitalsView})
    public async getPatientVitals(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Query() query: GetVitalQueryView,
    ): Promise<GetVitalsView> {
        const useCase = this.useCasesFactory.getVitals();

        try {
            return await useCase.getVitalsByGrantedUser(
                new GetVitalsByGrantedUserDto(query.startDate, query.endDate, patientUserId),
            );
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
