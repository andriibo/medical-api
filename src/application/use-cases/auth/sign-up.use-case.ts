import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from 'app/abstractions/auth.service';
import { ConfirmSignUpModel, SignUpModel } from 'app/abstractions/models';
import {
  ConfirmSignUpUserView,
  SignUpDoctorView,
  SignUpPatientView,
  SignUpUserView,
} from 'presentation/views/auth';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(IAuthService) private readonly authService: IAuthService,
  ) {}

  public async signUpUser(requestBody: SignUpUserView): Promise<void> {
    await this.authService.signUp(
      new SignUpModel(requestBody.userName, requestBody.password),
    );
  }

  public async signUpDoctor(requestBody: SignUpDoctorView): Promise<void> {

  }

  public async signUpPatient(requestBody: SignUpPatientView): Promise<void> {

  }

  public async confirmSignUnUser(
    requestBody: ConfirmSignUpUserView,
  ): Promise<void> {
    await this.authService.confirmSignUp(
      new ConfirmSignUpModel(requestBody.userName, requestBody.code),
    );
  }
}
