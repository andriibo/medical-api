export class ForgotPasswordMailSentDto {
    public message: string;

    public static fromResponse(responseMessage: string): ForgotPasswordMailSentDto {
        const dto = new ForgotPasswordMailSentDto();
        dto.message = responseMessage;

        return dto;
    }
}
