import {Body, Controller, Post, HttpCode, HttpStatus, BadRequestException, Get, Delete} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/factories/emergency-contact/patient-use-cases.factory';
import {CreateContactView, ContactView, DeleteContactView} from 'views/emergency-contact';

@Controller('patient/emergency-contact')
@ApiBearerAuth()
@ApiTags('Emergency Contact')
export class PatientController {
    constructor(private readonly useCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async initiate(@Body() requestBody: CreateContactView): Promise<void> {
        const useCase = this.useCasesFactory.createCreateContactUseCase();

        try {
            await useCase.createContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [ContactView]})
    public async list(): Promise<ContactView[]> {
        const useCase = this.useCasesFactory.createContactListUseCase();

        return await useCase.getList();
    }

    @Roles('Patient')
    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async delete(@Body() requestBody: DeleteContactView): Promise<void> {
        const useCase = this.useCasesFactory.createDeleteContactUseCase();

        try {
            await useCase.deleteContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
