import {
    Controller,
    HttpStatus,
    BadRequestException,
    Param,
    ParseUUIDPipe,
    Delete,
    Post,
    Get,
    HttpCode,
} from '@nestjs/common';
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
import {PatientUseCasesFactory} from 'infrastructure/modules/suggected-contact/factories';
import {SuggestedContactView} from 'views/response/suggested-contact';
import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Suggested Contact')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Delete('suggested-contact/:contactId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async deleteSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeleteSuggestedContactUseCase();

        try {
            await useCase.deleteSuggestedContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Post('suggested-contact/approve/:contactId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, description: 'OK.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async approveSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createApproveSuggestedContactUseCase();

        try {
            await useCase.approveSuggestedContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get('suggested-contacts')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [SuggestedContactView]})
    public async getSuggestedContacts(): Promise<SuggestedContactDto[]> {
        const useCase = this.patientUseCasesFactory.createContactListUseCase();

        return await useCase.getList();
    }
}
