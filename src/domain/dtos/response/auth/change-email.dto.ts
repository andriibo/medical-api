import {ChangeEmailResponseModel} from 'app/modules/auth/models';

export class ChangeEmailResultDto {
    public attributeName: string;
    public deliveryMedium: string;
    public destination: string;

    public static fromResponse(response: ChangeEmailResponseModel): ChangeEmailResultDto {
        const dto = new ChangeEmailResultDto();
        dto.attributeName = response.attributeName;
        dto.deliveryMedium = response.deliveryMedium;
        dto.destination = response.destination;

        return dto;
    }
}
