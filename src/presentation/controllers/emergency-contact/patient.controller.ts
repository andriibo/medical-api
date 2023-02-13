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
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/modules/emergency-contact/factories/patient-use-cases.factory';
import {CreateContactView, UpdateContactView} from 'presentation/views/request/emergency-contact';
import {ContactView} from 'presentation/views/response/emergency-contact';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Emergency Contact')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Post('my-emergency-contact')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.CREATED})
    public async createMyEmergencyContact(@Body() requestBody: CreateContactView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createCreateContactUseCase();

        try {
            await useCase.createContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get('my-emergency-contacts')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [ContactView]})
    public async getMyEmergencyContacts(): Promise<ContactDto[]> {
        const useCase = this.patientUseCasesFactory.createContactListUseCase();

        return await useCase.getList();
    }

    @Roles('Patient')
    @Patch('my-emergency-contact/:contactId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async updateMyEmergencyContact(
        @Param('contactId', ParseUUIDPipe) contactId: string,
        @Body() requestBody: UpdateContactView,
    ): Promise<void> {
        const useCase = this.patientUseCasesFactory.createUpdateContactUseCase();

        try {
            await useCase.updateContact(contactId, requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Delete('my-emergency-contact/:contactId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    public async deleteMyEmergencyContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeleteContactUseCase();

        try {
            await useCase.deleteContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
