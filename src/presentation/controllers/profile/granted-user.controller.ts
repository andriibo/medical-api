import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {MyPatientView} from 'views/response/profile/my-patient.view';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {GrantedUserUseCasesFactory} from 'infrastructure/modules/profile/factories';
import {PatientView} from 'views/response/user';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Profile')
export class GrantedUserController {
    public constructor(private readonly grantedUserUseCasesFactory: GrantedUserUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Get('profile/my-patients')
    @ApiResponse({status: HttpStatus.OK, type: [MyPatientView]})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    public async getMyPatients(): Promise<MyPatientDto[]> {
        const useCase = this.grantedUserUseCasesFactory.createPatientListUseCase();

        return await useCase.getMyPatientList();
    }

    @Roles('Caregiver', 'Doctor')
    @Get('patient-profile/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: PatientView})
    public async getPatientProfile(@Param('patientUserId', ParseUUIDPipe) patientUserId: string): Promise<PatientDto> {
        const useCase = this.grantedUserUseCasesFactory.createGetPatientProfileUseCase();

        try {
            return await useCase.getProfileInfo(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
