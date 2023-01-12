import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty, IsIn, MaxLength, IsNumberString} from 'class-validator';
import {SuggestedContactDto} from 'domain/dtos/request/suggested-contact/suggested-contact.dto';

export class CreateSuggestedContactView extends SuggestedContactDto {
    @ApiProperty()
    @IsNotEmpty()
    public patientUserId: string;

    @ApiProperty({minLength: 2, maxLength: 30})
    @IsNotEmpty()
    @Length(2, 30)
    public firstName: string;

    @ApiProperty({minLength: 2, maxLength: 30})
    @IsNotEmpty()
    @Length(2, 30)
    public lastName: string;

    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;

    @ApiProperty({minLength: 7, maxLength: 15})
    @IsNotEmpty()
    @Length(7, 15)
    @IsNumberString()
    public phone: string;

    @ApiProperty({enum: ['MedicalProfessional', 'Caregiver', 'Friends&Family']})
    @IsNotEmpty()
    @IsIn(['MedicalProfessional', 'Caregiver', 'Friends&Family'])
    public relationship: string;
}
