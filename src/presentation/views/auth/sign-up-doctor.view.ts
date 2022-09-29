import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDoctorView {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 30)
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 30)
  public lastName: string;

  @ApiProperty()
  public phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 100)
  public institution: string;

  @ApiProperty()
  @IsNotEmpty()
  public password: string;
}
