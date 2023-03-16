import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {VitalUseCasesFactory} from 'infrastructure/modules/vital/factories/vital-use-cases.factory';
import {AbsoluteVitalsDto} from 'domain/dtos/response/vital/absolute-vitals.dto';
import {AbsoluteVitalsView} from 'views/response/vital';
import {Auth} from 'presentation/guards';

@Controller()
@ApiBearerAuth()
@ApiTags('Vitals')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class VitalController {
    public constructor(private readonly vitalUseCasesFactory: VitalUseCasesFactory) {}

    @Auth()
    @Get('/vitals/absolute')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: AbsoluteVitalsView})
    public async getAbsoluteVitals(): Promise<AbsoluteVitalsDto> {
        const useCase = this.vitalUseCasesFactory.createAbsoluteVitalsUseCase();

        return useCase.getList();
    }
}
