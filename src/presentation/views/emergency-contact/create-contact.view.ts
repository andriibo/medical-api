import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty, IsIn} from 'class-validator';
import {CreateContactDto} from 'domain/dtos/emergency-contact/create-contact.dto';

export class CreateContactView extends CreateContactDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 30)
    public firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 30)
    public lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(11, 11)
    public phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['MedicalProfessional', 'Caregiver', 'Friends&Family'])
    public relationship: string;
}
