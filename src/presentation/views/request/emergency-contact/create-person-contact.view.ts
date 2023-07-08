import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty, IsIn, MaxLength, IsNumberString} from 'class-validator';
import {PersonEmergencyContactDto} from 'domain/dtos/request/emergency-contact/person-emergency-contact.dto';
import {MaxPhoneLength, MinPhoneLength} from 'domain/constants/user.const';
import {Transform, TransformFnParams} from 'class-transformer';
import {PersonEmergencyContactRelationshipEnum} from 'domain/constants/emergency-contact.const';

export class CreatePersonContactView extends PersonEmergencyContactDto {
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

    @ApiProperty({maxLength: 100})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;

    @ApiProperty({minLength: MinPhoneLength, maxLength: MaxPhoneLength})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Length(MinPhoneLength, MaxPhoneLength)
    @IsNumberString()
    public phone: string;

    @ApiProperty({
        enum: [
            PersonEmergencyContactRelationshipEnum.MedicalProfessional,
            PersonEmergencyContactRelationshipEnum.Caregiver,
            PersonEmergencyContactRelationshipEnum.FriendsFamily,
        ],
    })
    @IsNotEmpty()
    @IsIn([
        PersonEmergencyContactRelationshipEnum.MedicalProfessional,
        PersonEmergencyContactRelationshipEnum.Caregiver,
        PersonEmergencyContactRelationshipEnum.FriendsFamily,
    ])
    public relationship: string;
}
