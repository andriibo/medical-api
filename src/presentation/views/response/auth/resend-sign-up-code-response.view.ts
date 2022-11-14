import {ApiProperty} from '@nestjs/swagger';
import {ConfirmEmailResentDto} from 'domain/dtos/response/auth';

export class ResendSignUpCodeResponseView extends ConfirmEmailResentDto {
    @ApiProperty()
    public attributeName: string;

    @ApiProperty()
    public deliveryMedium: string;

    @ApiProperty()
    public destination: string;
}
