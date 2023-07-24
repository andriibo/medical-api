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
    ApiOperation,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/modules/suggected-contact/factories';
import {SuggestedContactsView} from 'views/response/suggested-contact';
import {SuggestedContactsDto} from 'domain/dtos/response/suggested-contact';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Suggested Contact')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Delete('person-suggested-contact/:contactId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async deletePersonSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeletePersonSuggestedContactUseCase();

        try {
            await useCase.deleteContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Delete('organization-suggested-contact/:contactId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async deleteOrganizationSuggestedContact(
        @Param('contactId', ParseUUIDPipe) contactId: string,
    ): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeleteOrganizationSuggestedContactUseCase();

        try {
            await useCase.deleteContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Post('person-suggested-contact/approve/:contactId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, description: 'OK.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async approvePersonSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createApprovePersonSuggestedContactUseCase();

        try {
            await useCase.approveContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Post('organization-suggested-contact/approve/:contactId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, description: 'OK.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async approveOrganizationSuggestedContact(
        @Param('contactId', ParseUUIDPipe) contactId: string,
    ): Promise<void> {
        const useCase = this.patientUseCasesFactory.createApproveOrganizationSuggestedContactUseCase();

        try {
            await useCase.approveContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get('suggested-contacts')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: SuggestedContactsView})
    public async getSuggestedContacts(): Promise<SuggestedContactsDto> {
        const useCase = this.patientUseCasesFactory.createGetPatientContactsUseCase();

        return await useCase.getContacts();
    }
}
