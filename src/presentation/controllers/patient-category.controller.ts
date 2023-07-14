import {Controller, HttpStatus, HttpCode, Param, ParseUUIDPipe, Patch} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';

@Controller('patient-category')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
@ApiBadRequestResponse({description: 'Bad request.'})
@ApiTags('Patient Category')
export class PatientCategoryController {
    @Roles('Caregiver', 'Doctor')
    @Patch('normal/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    @ApiOperation({deprecated: true})
    public async setPatientCategoryNormal(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
    ): Promise<void> {}

    @Roles('Caregiver', 'Doctor')
    @Patch('borderline/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    @ApiOperation({deprecated: true})
    public async setPatientCategoryBorderline(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
    ): Promise<void> {}
}
