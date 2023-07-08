import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsNumberString, IsOptional} from 'class-validator';
import {UpdateCaregiverProfileDto} from 'domain/dtos/request/profile';
import {MaxPhoneLength, MinPhoneLength} from 'domain/constants/user.const';
import {Transform, TransformFnParams} from 'class-transformer';

export class UpdateCaregiverProfileView extends UpdateCaregiverProfileDto {
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
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsOptional()
    @Length(0, 100)
    public institution?: string;
}
