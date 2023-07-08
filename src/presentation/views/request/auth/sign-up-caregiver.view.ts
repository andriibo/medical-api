import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty, MaxLength, IsNumberString, MinLength, IsIn, IsOptional} from 'class-validator';
import {CreateCaregiverDto} from 'domain/dtos/request/auth/create-caregiver.dto';
import {MaxPhoneLength, MinPhoneLength} from 'domain/constants/phone.const';
import {Transform, TransformFnParams} from 'class-transformer';
import {UserRoleLabel} from 'domain/entities/user.entity';

export class SignUpCaregiverView extends CreateCaregiverDto {
    @ApiProperty({maxLength: 100})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Length(1, 30)
    public firstName: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Length(1, 30)
    public lastName: string;

    @ApiProperty({minLength: MinPhoneLength, maxLength: MaxPhoneLength})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Length(MinPhoneLength, MaxPhoneLength)
    @IsNumberString()
    public phone: string;

    @ApiProperty({required: false, minLength: 0, maxLength: 100})
    @IsOptional()
    @Length(0, 100)
    public institution?: string;

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @MinLength(8)
    public password: string;

    @ApiProperty({enum: [UserRoleLabel.CaregiverProfessional, UserRoleLabel.Family, UserRoleLabel.Friend]})
    @IsNotEmpty()
    @IsIn([UserRoleLabel.CaregiverProfessional, UserRoleLabel.Family, UserRoleLabel.Friend])
    public roleLabel: string;
}
