import {ApiProperty} from '@nestjs/swagger';
import {OrganizationContactDto} from 'domain/dtos/response/emergency-contact';

export class OrganizationContactView implements OrganizationContactDto {
    @ApiProperty()
    public contactId: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public email: string | null;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public fax: string | null;

    @ApiProperty()
    public type: string;

    @ApiProperty()
    public createdAt: number;
}
