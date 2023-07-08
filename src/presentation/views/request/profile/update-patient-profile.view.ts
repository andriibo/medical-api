import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsIn, IsInt, Min, Max, IsNumberString, IsISO8601} from 'class-validator';
import {UpdatePatientProfileDto} from 'domain/dtos/request/profile/update-patient-profile.dto';
import {MaxPhoneLength, MinPhoneLength} from 'domain/constants/user.const';
import {Transform, TransformFnParams} from 'class-transformer';
import {MaxDate, MinDate} from 'infrastructure/validators/date.validator';
import {GenderEnum} from 'domain/constants/user.const';

export class UpdatePatientProfileView extends UpdatePatientProfileDto {
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
}
