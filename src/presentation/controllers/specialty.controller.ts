import {Controller, HttpStatus, Get, HttpCode} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {SpecialtyUseCasesFactory} from 'infrastructure/modules/specialty/factories/specialty-use-cases.factory';
import {SpecialtiesView} from 'views/response/specialty';
import {SpecialtiesDto} from 'domain/dtos/response/specialty/specialties.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Specialty')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class SpecialtyController {
    public constructor(private readonly specialtyUseCasesFactory: SpecialtyUseCasesFactory) {}

    @Get('specialties')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: SpecialtiesView})
    public async getDiagnoses(): Promise<SpecialtiesDto> {
        const useCase = this.specialtyUseCasesFactory.createGetSpecialtiesUseCase();

        return await useCase.getSpecialties();
    }
}
