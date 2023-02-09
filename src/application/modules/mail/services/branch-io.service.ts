export interface IBranchIoService {
    signUpLinkForPatient(email: string): Promise<string>;

    signUpLinkForCaregiver(email: string): Promise<string>;

    signUpLinkForDoctor(email: string): Promise<string>;
}

export const IBranchIoService = Symbol('IBranchIoService');
