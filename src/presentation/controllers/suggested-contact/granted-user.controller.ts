import {
    Controller,
    HttpStatus,
    BadRequestException,
    Post,
    Body,
    Delete,
    Param,
    ParseUUIDPipe,
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
import {
    CreatePersonSuggestedContactView,
    CreateOrganizationSuggestedContactView,
} from 'views/request/suggested-contact';
import {GrantedUserUseCasesFactory} from 'infrastructure/modules/suggected-contact/factories';
import {TrimPipe} from 'presentation/pipes/trim.pipe';
import {PersonSuggestedContactDto, SuggestedContactsDto} from 'domain/dtos/response/suggested-contact';
import {SuggestedContactsView, PersonSuggestedContactView} from 'views/response/suggested-contact';

@Controller()
@ApiBearerAuth()
@ApiTags('Suggested Contact')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Post('suggested-contact')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED, description: 'Created.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiOperation({deprecated: true, summary: 'use POST /person-suggested-contact'})
    public async createSuggestedContact(@Body(TrimPipe) requestBody: CreatePersonSuggestedContactView): Promise<void> {
        await this.createPersonSuggestedContact(requestBody);
    }

    @Roles('Caregiver', 'Doctor')
    @Post('person-suggested-contact')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED, description: 'Created.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    public async createPersonSuggestedContact(
        @Body(TrimPipe) requestBody: CreatePersonSuggestedContactView,
    ): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createPersonSuggestedContactUseCase();

        try {
            await useCase.createContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Post('organization-suggested-contact')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED, description: 'Created.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    public async createOrganizationSuggestedContact(
        @Body(TrimPipe) requestBody: CreateOrganizationSuggestedContactView,
    ): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createOrganizationSuggestedContactUseCase();

        try {
            await useCase.createContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Delete('suggested-contact/:contactId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    @ApiOperation({deprecated: true, summary: 'use DELETE /person-suggested-contact/:contactId'})
    public async deleteSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        await this.deletePersonSuggestedContact(contactId);
    }

    @Roles('Caregiver', 'Doctor')
    @Delete('person-suggested-contact/:contactId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async deletePersonSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createDeletePersonSuggestedContactUseCase();

        try {
            await useCase.deleteContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Delete('organization-suggested-contact/:contactId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    public async deleteOrganizationSuggestedContact(
        @Param('contactId', ParseUUIDPipe) contactId: string,
    ): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createDeleteOrganizationSuggestedContactUseCase();

        try {
            await useCase.deleteContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Get('my-suggested-contacts/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [PersonSuggestedContactView]})
    @ApiOperation({deprecated: true, summary: 'use GET /suggested-contacts/:patientUserId'})
    public async getPatientSuggestedContacts(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<PersonSuggestedContactDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createPatientContactUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Get('suggested-contacts/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: SuggestedContactsView})
    public async getSuggestedContacts(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<SuggestedContactsDto> {
        const useCase = this.grantedUserUseCasesFactory.createGetGrantedUserContactsUseCase();

        try {
            return await useCase.getContacts(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
