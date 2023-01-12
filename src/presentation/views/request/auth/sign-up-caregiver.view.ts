import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty, MaxLength, IsNumberString} from 'class-validator';
import {CreateCaregiverDto} from 'domain/dtos/request/auth/create-caregiver.dto';
import {MaxPhoneLength, MinPhoneLength} from 'infrastructure/constants/phone.const';

export class SignUpCaregiverView extends CreateCaregiverDto {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public firstName: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public lastName: string;

    @ApiProperty({minLength: MinPhoneLength, maxLength: MaxPhoneLength})
    @IsNotEmpty()
    @Length(MinPhoneLength, MaxPhoneLength)
    @IsNumberString()
    public phone: string;

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @Length(8)
    public password: string;
}
