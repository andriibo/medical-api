import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty, IsIn, MaxLength, IsNumberString, IsOptional} from 'class-validator';
import {OrganizationEmergencyContactDto} from 'domain/dtos/request/emergency-contact/organization-emergency-contact.dto';
import {MaxPhoneLength, MinPhoneLength} from 'domain/constants/phone.const';
import {Transform, TransformFnParams} from 'class-transformer';
import {OrganizationType} from 'domain/entities/organization-emergency-contact.entity';

export class CreateOrganizationContactView extends OrganizationEmergencyContactDto {
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

    @ApiProperty({enum: [OrganizationType.Pharmacy, OrganizationType.NursingHome, OrganizationType.Other]})
    @IsNotEmpty()
    @IsIn([OrganizationType.Pharmacy, OrganizationType.NursingHome, OrganizationType.Other])
    public type: string;
}
