import {Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetVitalsDto} from 'domain/dtos/request/vital';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';
import {Roles} from 'presentation/guards';
import {GetVitalQueryView} from 'presentation/views/request/vital';
import {GetVitalsView} from 'presentation/views/response/vital';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Vitals')
export class DoctorController {
    constructor(private readonly useCasesFactory: VitalUseCasesFactory) {}

    @Roles('Doctor')
    @Get(':userId/vitals')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: GetVitalsView})
    public async getPatientVitals(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Query() query: GetVitalQueryView,
    ): Promise<GetVitalsView> {
        const useCase = this.useCasesFactory.getVitals();
        const responseModel = await useCase.getVitalsByDoctor(new GetVitalsDto(query.startDate, query.endDate, userId));

        return responseModel;
    }
}
