import {
    Body,
    Controller,
    Post,
    HttpStatus,
    BadRequestException,
    Get,
    Delete,
    Patch,
    Param,
    ParseUUIDPipe,
    HttpCode,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/modules/emergency-contact/factories/patient-use-cases.factory';
import {
    CreatePersonContactView,
    UpdatePersonContactView,
    SetContactsOrderView,
    CreateOrganizationContactView,
    UpdateOrganizationContactView,
} from 'presentation/views/request/emergency-contact';
import {EmergencyContactsDto} from 'domain/dtos/response/emergency-contact';
import {TrimPipe} from 'presentation/pipes/trim.pipe';
import {EmergencyContactsView} from 'views/response/emergency-contact/emergency-contacts.view';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Emergency Contact')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Post('person-emergency-contact')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.CREATED})
    public async createPersonEmergencyContact(@Body(TrimPipe) requestBody: CreatePersonContactView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createCreatePersonContactUseCase();

        try {
            await useCase.createContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Post('organization-emergency-contact')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.CREATED})
    public async createOrganizationEmergencyContact(
        @Body(TrimPipe) requestBody: CreateOrganizationContactView,
    ): Promise<void> {
        const useCase = this.patientUseCasesFactory.createCreateOrganizationContactUseCase();

        try {
            await useCase.createContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get('emergency-contacts')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: EmergencyContactsView})
    public async getEmergencyContacts(): Promise<EmergencyContactsDto> {
        const useCase = this.patientUseCasesFactory.createGetContactsUseCase();

        return await useCase.getContacts();
    }

    @Roles('Patient')
    @Patch('person-emergency-contact/:contactId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updatePersonEmergencyContact(
        @Param('contactId', ParseUUIDPipe) contactId: string,
        @Body(TrimPipe) requestBody: UpdatePersonContactView,
    ): Promise<void> {
        const useCase = this.patientUseCasesFactory.createUpdatePersonContactUseCase();

        try {
            await useCase.updateContact(contactId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Patch('organization-emergency-contact/:contactId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateOrganizationEmergencyContact(
        @Param('contactId', ParseUUIDPipe) contactId: string,
        @Body(TrimPipe) requestBody: UpdateOrganizationContactView,
    ): Promise<void> {
        const useCase = this.patientUseCasesFactory.createUpdateOrganizationContactUseCase();

        try {
            await useCase.updateContact(contactId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Patch('person-emergency-contacts/order')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async setOrderOfPersonEmergencyContacts(@Body(TrimPipe) requestBody: SetContactsOrderView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createSetPersonContactsOrderUseCase();

        try {
            await useCase.setOrder(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Patch('organization-emergency-contacts/order')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async setOrderOfOrganizationEmergencyContacts(
        @Body(TrimPipe) requestBody: SetContactsOrderView,
    ): Promise<void> {
        const useCase = this.patientUseCasesFactory.createSetOrganizationContactsOrderUseCase();

        try {
            await useCase.setOrder(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Delete('person-emergency-contact/:contactId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No Content.'})
    public async deletePersonEmergencyContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeletePersonContactUseCase();

        try {
            await useCase.deleteContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Delete('organization-emergency-contact/:contactId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No Content.'})
    public async deleteOrganizationEmergencyContact(
        @Param('contactId', ParseUUIDPipe) contactId: string,
    ): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeleteOrganizationContactUseCase();

        try {
            await useCase.deleteContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
