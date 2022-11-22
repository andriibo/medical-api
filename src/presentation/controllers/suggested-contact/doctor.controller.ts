import {Controller, HttpStatus, BadRequestException, Post, Body, Delete, Param, ParseUUIDPipe} from '@nestjs/common';
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
    @Post('suggested-contact')
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

    @Roles('Doctor')
    @Delete('suggested-contact/:accessId')
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async deleteSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.doctorUseCasesFactory.createDeleteSuggestedContactUseCase();

        try {
            await useCase.deleteSuggestedContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
