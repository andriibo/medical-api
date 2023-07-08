import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty, IsIn, MaxLength, IsNumberString, IsOptional} from 'class-validator';
import {OrganizationSuggestedContactDto} from 'domain/dtos/request/suggested-contact/organization-suggested-contact.dto';
import {MaxPhoneLength, MinPhoneLength} from 'domain/constants/user.const';
import {Transform, TransformFnParams} from 'class-transformer';
import {OrganizationTypeEnum} from 'domain/constants/emergency-contact.const';

export class CreateOrganizationSuggestedContactView extends OrganizationSuggestedContactDto {
    @ApiProperty()
    @IsNotEmpty()
    public patientUserId: string;

    @ApiProperty({minLength: 1, maxLength: 60})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Length(1, 60)
    public name: string;

    @ApiProperty({nullable: true, required: false, maxLength: 100})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsOptional()
    @IsEmail()
    @MaxLength(100)
    public email: string | null;

    @ApiProperty({minLength: MinPhoneLength, maxLength: MaxPhoneLength})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Length(MinPhoneLength, MaxPhoneLength)
    @IsNumberString()
    public phone: string;

    @ApiProperty({nullable: true, required: false, minLength: MinPhoneLength, maxLength: MaxPhoneLength})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsOptional()
    @IsNumberString()
    @Length(MinPhoneLength, MaxPhoneLength)
    public fax: string | null;

    @ApiProperty({enum: [OrganizationTypeEnum.Pharmacy, OrganizationTypeEnum.NursingHome, OrganizationTypeEnum.Other]})
    @IsNotEmpty()
    @IsIn([OrganizationTypeEnum.Pharmacy, OrganizationTypeEnum.NursingHome, OrganizationTypeEnum.Other])
    public type: string;
}
