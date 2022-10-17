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
} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/factories/emergency-contact/patient-use-cases.factory';
import {CreateContactView, UpdateContactView} from 'presentation/views/request/emergency-contact';
import {ContactView} from 'presentation/views/response/emergency-contact';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';

@Controller('patient/emergency-contact')
@ApiBearerAuth()
@ApiTags('Emergency Contact')
export class PatientController {
    constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Post()
    public async create(@Body() requestBody: CreateContactView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createCreateContactUseCase();

        try {
            await useCase.createContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get()
    @ApiResponse({status: HttpStatus.OK, type: [ContactView]})
    public async list(): Promise<ContactDto[]> {
        const useCase = this.patientUseCasesFactory.createContactListUseCase();

        return await useCase.getList();
    }

    @Roles('Patient')
    @Patch(':contactId')
    public async update(
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
    @Delete(':contactId')
    public async delete(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.patientUseCasesFactory.createDeleteContactUseCase();

        try {
            await useCase.deleteContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
