import {Controller, HttpStatus, BadRequestException, Param, ParseUUIDPipe, Delete, Post} from '@nestjs/common';
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
    @Delete('suggested-contact/refuse/:contactId')
    @ApiResponse({status: HttpStatus.OK, description: 'OK.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async refuseSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createRefuseSuggestedContactUseCase();

        try {
            await useCase.refuseSuggestedContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Post('suggested-contact/approve/:contactId')
    @ApiResponse({status: HttpStatus.OK, description: 'OK.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async approveSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createApproveSuggestedContactUseCase();

        try {
            await useCase.approveSuggestedContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
