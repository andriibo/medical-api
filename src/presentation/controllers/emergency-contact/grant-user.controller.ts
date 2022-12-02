import {Controller, HttpStatus, Get, Param, ParseUUIDPipe, HttpCode, BadRequestException} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {GrantedUserUseCasesFactory} from 'infrastructure/factories/emergency-contact/granted-user-use-cases.factory';
import {ContactView} from 'presentation/views/response/emergency-contact';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Emergency Contact')
export class GrantUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Doctor')
    @Get('doctor/patient-emergency-contacts/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use GET "/patient-emergency-contacts/{patientUserId}" instead.',
    })
    @ApiResponse({status: HttpStatus.OK, type: [ContactView]})
    public async getPatientEmergencyContactsDeprecated(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<ContactDto[]> {
        return this.getPatientEmergencyContacts(patientUserId);
    }

    @Roles('Caregiver', 'Doctor')
    @Get('patient-emergency-contacts/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: [ContactView]})
    public async getPatientEmergencyContacts(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<ContactDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createPatientContactUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
