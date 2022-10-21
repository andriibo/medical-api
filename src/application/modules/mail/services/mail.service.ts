export interface IMailService {
    sendInviteToSignUp(email: string): Promise<void>;
}

export const IMailService = Symbol('IMailService');
