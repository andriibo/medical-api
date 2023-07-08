import {ApiProperty} from '@nestjs/swagger';
import {
    IsInt,
    Length,
    IsEmail,
    Min,
    Max,
    IsNotEmpty,
    IsIn,
    MaxLength,
    IsNumberString,
    IsISO8601,
    MinLength,
} from 'class-validator';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {Transform, TransformFnParams} from 'class-transformer';
import {MaxPhoneLength, MinPhoneLength} from 'domain/constants/user.const';
import {MaxDate, MinDate} from 'infrastructure/validators/date.validator';
import {GenderEnum, UserRoleLabelEnum} from 'domain/constants/user.const';

export class SignUpPatientView extends CreatePatientDto {
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

    @ApiProperty()
    @IsNotEmpty()
    @IsISO8601()
    @MinDate(new Date(1930, 0, 1))
    @MaxDate(new Date())
    public dob: Date;

    @ApiProperty({enum: [GenderEnum.Male, GenderEnum.Female, GenderEnum.Other]})
    @IsNotEmpty()
    @IsIn([GenderEnum.Male, GenderEnum.Female, GenderEnum.Other])
    public gender: string;

    @ApiProperty({minimum: 50, maximum: 250})
    @IsNotEmpty()
    @IsInt()
    @Min(50)
    @Max(250)
    public height: number;

    @ApiProperty({minimum: 10, maximum: 200})
    @IsNotEmpty()
    @IsInt()
    @Min(10)
    @Max(200)
    public weight: number;

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @MinLength(8)
    public password: string;

    @ApiProperty({enum: [UserRoleLabelEnum.Patient]})
    @IsNotEmpty()
    @IsIn([UserRoleLabelEnum.Patient])
    public roleLabel: string;
}
