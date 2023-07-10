import {ApiProperty} from '@nestjs/swagger';
import {OrganizationEmergencyContactDto} from 'domain/dtos/response/emergency-contact';
import {OrganizationTypeEnum} from 'domain/constants/emergency-contact.const';

export class OrganizationEmergencyContactView implements OrganizationEmergencyContactDto {
    @ApiProperty()
    public contactId: string;

    @ApiProperty()
    public name: string;

    @ApiProperty({nullable: true})
    public email: string | null;

    @ApiProperty()
    public phone: string;

    @ApiProperty({nullable: true})
    public fax: string | null;

    @ApiProperty({enum: OrganizationTypeEnum})
    public type: string;

    @ApiProperty()
    public createdAt: number;
}
