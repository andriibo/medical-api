import {Controller, HttpStatus, Get, HttpCode} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Auth} from 'presentation/guards';
import {SpecialtyUseCasesFactory} from 'infrastructure/modules/specialty/factories/specialty-use-cases.factory';
import {SpecialtyView} from 'views/response/specialty';
import {SpecialtyDto} from 'domain/dtos/response/specialty/specialty.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Specialty')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class SpecialtyController {
    public constructor(private readonly specialtyUseCasesFactory: SpecialtyUseCasesFactory) {}

    @Auth()
    @Get('specialties')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [SpecialtyView]})
    public async getDiagnoses(): Promise<SpecialtyDto[]> {
        const useCase = this.specialtyUseCasesFactory.createGetSpecialtiesUseCase();

        return await useCase.getSpecialties();
    }
}
