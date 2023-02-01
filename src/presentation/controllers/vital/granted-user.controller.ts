import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetVitalsByGrantedUserDto} from 'domain/dtos/request/vital';
import {VitalUseCasesFactory} from 'infrastructure/modules/vital/factories/vital-use-cases.factory';
import {Roles} from 'presentation/guards';
import {GetVitalsQueryView} from 'presentation/views/request/vital';
import {VitalsView} from 'presentation/views/response/vital';

@Controller()
@ApiBearerAuth()
@ApiTags('Vitals')
export class GrantedUserController {
    public constructor(private readonly useCasesFactory: VitalUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Get('/patient-vitals/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: VitalsView})
    public async getPatientVitals(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        @Query() query: GetVitalsQueryView,
    ): Promise<VitalsView> {
        const useCase = this.useCasesFactory.createGetVitalsUseCase();

        try {
            return await useCase.getVitalsByGrantedUser(
                new GetVitalsByGrantedUserDto(query.startDate, query.endDate, patientUserId),
            );
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
