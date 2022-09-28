export class ConfirmSignUpModel {
  public userName: string;
  public code: string;

  constructor(userName: string, code: string) {
    this.userName = userName;
    this.code = code;
  }
}
