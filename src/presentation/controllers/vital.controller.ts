import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';
import {Roles} from 'presentation/guards';
import {GetVitalView} from 'presentation/views/vital/get-vital.view';
import {SyncVitalView} from 'presentation/views/vital/sync-vital.view';

@Controller('vitals')
@ApiBearerAuth()
@ApiTags('Vitals')
export class VitalController {
    constructor(private readonly useCasesFactory: VitalUseCasesFactory) {}

    @Roles('Patient')
    @Post('')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async syncVitals(@Body() requestBody: SyncVitalView): Promise<void> {
        const useCase = this.useCasesFactory.syncPatientVitals();

    }

    @Roles('Patient')
    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async getVitals(@Param() params: GetVitalView): Promise<void> {
        const useCase = this.useCasesFactory.getVitals();

    }
}
