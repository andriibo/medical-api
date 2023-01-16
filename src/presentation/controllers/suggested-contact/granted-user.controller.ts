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
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {CreateSuggestedContactView} from 'views/request/suggested-contact';
import {GrantedUserUseCasesFactory} from 'infrastructure/modules/suggected-contact/factories';
import {MySuggestedContactView} from 'views/response/suggested-contact';
import {MySuggestedContactDto} from 'domain/dtos/response/suggested-contact/my-suggested-contact.dto';

@Controller()
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
@ApiBadRequestResponse({description: 'Bad request.'})
@ApiNotFoundResponse({description: 'Not Found.'})
@ApiTags('Suggested Contact')
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Post('suggested-contact')
    @ApiResponse({status: HttpStatus.CREATED, description: 'Created.'})
    public async createSuggestedContact(@Body() requestBody: CreateSuggestedContactView): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createSuggestedContactUseCase();

        try {
            await useCase.createSuggestedContact(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Delete('suggested-contact/:contactId')
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    public async deleteSuggestedContact(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        const useCase = this.grantedUserUseCasesFactory.createDeleteSuggestedContactUseCase();

        try {
            await useCase.deleteSuggestedContact(contactId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Get('my-suggested-contacts/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: [MySuggestedContactView]})
    public async getPatientSuggestedContacts(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<MySuggestedContactDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createPatientContactUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
