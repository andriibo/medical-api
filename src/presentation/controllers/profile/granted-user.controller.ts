import {Controller, Get, HttpStatus} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {MyPatientView} from 'views/response/profile/my-patient.view';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {GrantedUserUseCasesFactory} from 'infrastructure/modules/profile/factories';

@Controller()
@ApiBearerAuth()
@ApiTags('Profile')
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Doctor')
    @Get('doctor/my-patients')
    @ApiOperation({
        deprecated: true,
        summary: 'Deprecated endpoint. Use GET "/profile/my-patients" instead.',
    })
    @ApiResponse({status: HttpStatus.OK, type: [MyPatientView]})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    public async getMyPatientsDeprecated(): Promise<MyPatientDto[]> {
        return await this.getMyPatients();
    }

    @Roles('Caregiver', 'Doctor')
    @Get('profile/my-patients')
    @ApiResponse({status: HttpStatus.OK, type: [MyPatientView]})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    public async getMyPatients(): Promise<MyPatientDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createPatientListUseCase();

        return await useCase.getMyPatientList();
    }
}
