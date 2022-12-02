import {Controller, HttpStatus, BadRequestException, Post, Body} from '@nestjs/common';
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
}
