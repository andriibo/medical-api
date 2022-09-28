import { ApiProperty } from '@nestjs/swagger';

export class SignInUserView {
  @ApiProperty()
  public userName: string;
  @ApiProperty()
  public password: string;
}
