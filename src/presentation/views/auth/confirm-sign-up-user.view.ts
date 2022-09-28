import { ApiProperty } from '@nestjs/swagger';

export class ConfirmSignUpUserView {
  @ApiProperty()
  public userName: string;
  @ApiProperty()
  public code: string;
}
