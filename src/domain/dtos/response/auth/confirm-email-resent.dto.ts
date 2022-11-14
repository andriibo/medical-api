import {ResendConfirmationCodeResultModel} from 'app/modules/auth/models';

export class ConfirmEmailResentDto {
    public attributeName: string;
    public deliveryMedium: string;
    public destination: string;

    public static fromResponse(response: ResendConfirmationCodeResultModel): ConfirmEmailResentDto {
        const dto = new ConfirmEmailResentDto();
        dto.attributeName = response.attributeName;
        dto.deliveryMedium = response.deliveryMedium;
        dto.destination = response.destination;

        return dto;
    }
}
