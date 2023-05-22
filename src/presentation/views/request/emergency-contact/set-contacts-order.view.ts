import {ApiProperty} from '@nestjs/swagger';
import {ArrayMinSize, IsArray, IsString, IsUUID} from 'class-validator';
import {ContactsOrderDto} from 'domain/dtos/request/emergency-contact/contacts-order.dto';

export class SetContactsOrderView extends ContactsOrderDto {
    @ApiProperty({isArray: true, type: [String]})
    @IsArray()
    @ArrayMinSize(1)
    @IsString({each: true})
    @IsUUID('4', {each: true})
    public contactIds: string[];
}
