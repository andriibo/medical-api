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
import {PersonEmergencyContactView} from 'presentation/views/response/emergency-contact';
import {EmergencyContactsDto, PersonEmergencyContactDto} from 'domain/dtos/response/emergency-contact';
import {EmergencyContactsView} from 'views/response/emergency-contact/emergency-contacts.view';

@Controller()
@ApiBearerAuth()
@ApiTags('Emergency Contact')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class GrantUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Get('emergency-contacts/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: EmergencyContactsView})
    public async getEmergencyContacts(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<EmergencyContactsDto> {
        const useCase = this.grantedUserUseCasesFactory.createGetPatientContactsUseCase();

        try {
            return await useCase.getContacts(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
