export interface IDeepLinkService {
    getSignUpLinkForPatient(email: string): Promise<string>;

    getSignUpLinkForCaregiver(email: string): Promise<string>;

    getSignUpLinkForDoctor(email: string): Promise<string>;

    getRequestsLinkForGrantedUser(): Promise<string>;

    getRequestsLinkForPatient(): Promise<string>;
}

export const IDeepLinkService = Symbol('IDeepLinkService');
