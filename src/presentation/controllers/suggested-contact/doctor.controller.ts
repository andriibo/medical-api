import {Controller, HttpStatus, BadRequestException, Post, Body} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {CreateSuggestedContactView} from 'views/request/suggested-contact';
import {DoctorUseCasesFactory} from 'infrastructure/factories/suggested-contact';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Suggested Contact')
export class DoctorController {
    public constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Post('suggested-contacts')
    @ApiResponse({status: HttpStatus.CREATED, description: 'Created.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async createSuggestedContact(@Body() requestBody: CreateSuggestedContactView): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createSuggestedContactUseCase();

        try {
            await useCase.createSuggestedContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
