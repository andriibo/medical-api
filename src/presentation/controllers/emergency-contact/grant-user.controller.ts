import {Controller, HttpStatus, Get, Param, ParseUUIDPipe, HttpCode, BadRequestException} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiOperation,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {GrantedUserUseCasesFactory} from 'infrastructure/modules/emergency-contact/factories/granted-user-use-cases.factory';
import {PersonContactView} from 'presentation/views/response/emergency-contact';
import {ContactsDto, PersonContactDto} from 'domain/dtos/response/emergency-contact';
import {ContactsView} from 'views/response/emergency-contact/contacts.view';

@Controller()
@ApiBearerAuth()
@ApiTags('Emergency Contact')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class GrantUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Get('patient-emergency-contacts/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: [PersonContactView]})
    @ApiOperation({deprecated: true, summary: 'use GET /emergency-contacts/:patientUserId'})
    public async getPatientEmergencyContacts(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<PersonContactDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createPatientContactUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Get('emergency-contacts/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: ContactsView})
    public async getEmergencyContacts(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<ContactsDto> {
        const useCase = this.grantedUserUseCasesFactory.createGetPatientContactsUseCase();

        try {
            return await useCase.getPatientContacts(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
