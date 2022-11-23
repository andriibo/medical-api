import {Controller, HttpStatus, BadRequestException, Param, ParseUUIDPipe, Delete} from '@nestjs/common';
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
import {PatientUseCasesFactory} from 'infrastructure/factories/suggested-contact/patient-use-cases.factory';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Suggested Contact')
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Delete('suggested-contact/:contactId')
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async deleteSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeleteSuggestedContactUseCase();

        try {
            await useCase.deleteSuggestedContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
