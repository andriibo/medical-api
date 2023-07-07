import {ApiProperty} from '@nestjs/swagger';
import {PersonEmergencyContactDto} from 'domain/dtos/response/emergency-contact';

export class PersonEmergencyContactView implements PersonEmergencyContactDto {
    @ApiProperty()
    public contactId: string;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public relationship: string;

    @ApiProperty()
    public createdAt: number;
}
