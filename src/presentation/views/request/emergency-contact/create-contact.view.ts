import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty, IsIn, MaxLength} from 'class-validator';
import {ContactDto} from 'domain/dtos/request/emergency-contact/contact.dto';

export class CreateContactView extends ContactDto {
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

    @ApiProperty({minLength: 11, maxLength: 11})
    @IsNotEmpty()
    @Length(11, 11)
    public phone: string;

    @ApiProperty({enum: ['MedicalProfessional', 'Caregiver', 'Friends&Family']})
    @IsNotEmpty()
    @IsIn(['MedicalProfessional', 'Caregiver', 'Friends&Family'])
    public relationship: string;
}
