import {Inject, Injectable} from '@nestjs/common';
import {IAuthService} from 'app/abstractions/auth.service';
import {ConfirmSignUpModel, SignUpModel} from 'app/abstractions/models';
import {ConfirmSignUpUserView, SignUpDoctorView, SignUpPatientView} from 'presentation/views/auth';
import {UserRole} from 'domain/entities/user.entity';

@Injectable()
export class SignUpUseCase {
    constructor(@Inject(IAuthService) private readonly authService: IAuthService) {}

    public async signUpDoctor(requestBody: SignUpDoctorView): Promise<void> {
        await this.authService.signUp(new SignUpModel(requestBody.email, requestBody.password));
        this.setUserRole(requestBody.email, UserRole.Doctor);
    }

    public async signUpPatient(requestBody: SignUpPatientView): Promise<void> {
        await this.authService.signUp(new SignUpModel(requestBody.email, requestBody.password));
        this.setUserRole(requestBody.email, UserRole.Patient);
    }

    public async confirmSignUnUser(requestBody: ConfirmSignUpUserView): Promise<void> {
        await this.authService.confirmSignUp(new ConfirmSignUpModel(requestBody.userName, requestBody.code));
    }

    private async setUserRole(userName: string, role: string): Promise<void> {
        const isGroupExist = await this.authService.isGroupExist(role);
        if (!isGroupExist) {
            await this.authService.createUserGroup(role);
        }

        await this.authService.addUserToGroup(userName, role);
    }
}
