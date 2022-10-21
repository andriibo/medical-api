import {Controller, HttpStatus, Get, Param, ParseUUIDPipe, HttpCode, BadRequestException} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {DoctorUseCasesFactory} from 'infrastructure/factories/emergency-contact/doctor-use-cases.factory';
import {ContactView} from 'presentation/views/response/emergency-contact';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Emergency Contact')
export class DoctorController {
    public constructor(private readonly doctorUseCasesFactory: DoctorUseCasesFactory) {}

    @Roles('Doctor')
    @Get('patient-emergency-contacts/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: [ContactView]})
    public async getPatientEmergencyContacts(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<ContactDto[]> {
        const useCase = this.doctorUseCasesFactory.createPatientContactUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
