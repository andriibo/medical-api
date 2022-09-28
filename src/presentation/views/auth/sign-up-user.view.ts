import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserView {
  @ApiProperty()
  public userName: string;
  @ApiProperty()
  public password: string;
}
