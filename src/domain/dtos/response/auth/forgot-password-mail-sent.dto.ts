import {ForgotPasswordResponseModel} from 'app/modules/auth/models';

export class ForgotPasswordMailSentDto {
    public attributeName: string;
    public deliveryMedium: string;
    public destination: string;

    public static fromResponse(response: ForgotPasswordResponseModel): ForgotPasswordMailSentDto {
        const dto = new ForgotPasswordMailSentDto();
        dto.attributeName = response.attributeName;
        dto.deliveryMedium = response.deliveryMedium;
        dto.destination = response.destination;

        return dto;
    }
}
