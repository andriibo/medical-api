import {Body, Controller, Post, HttpCode, HttpStatus, BadRequestException} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientUseCasesFactory} from 'infrastructure/factories/emergency-contact/patient-use-cases.factory';
import {CreateContactView} from 'views/emergency-contact';

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
}
