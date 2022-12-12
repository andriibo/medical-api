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
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {CreateSuggestedContactView} from 'views/request/suggested-contact';
import {GrantedUserUseCasesFactory} from 'infrastructure/factories/suggested-contact/granted-user-use-cases.factory';
import {SuggestedContactView} from 'views/response/suggested-contact';
import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';

@Controller()
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
@ApiBadRequestResponse({description: 'Bad request.'})
@ApiNotFoundResponse({description: 'Not Found.'})
@ApiTags('Suggested Contact')
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Doctor')
    @Post('doctor/suggested-contact')
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use POST "/suggested-contact" instead.',
    })
    @ApiResponse({status: HttpStatus.CREATED, description: 'Created.'})
    public async createSuggestedContactDeprecated(@Body() requestBody: CreateSuggestedContactView): Promise<void> {
        return this.createSuggestedContact(requestBody);
    }

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

    @Roles('Doctor')
    @Delete('doctor/suggested-contact/:contactId')
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use DELETE  "/suggested-contact/{contactId}" instead.',
    })
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'No content.'})
    public async deleteSuggestedContactDeprecated(@Param('contactId', ParseUUIDPipe) contactId: string): Promise<void> {
        return this.deleteSuggestedContact(contactId);
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
    @ApiResponse({status: HttpStatus.OK, type: [SuggestedContactView]})
    public async getPatientSuggestedContacts(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<SuggestedContactDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createPatientContactUseCase();

        try {
            return await useCase.getList(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
