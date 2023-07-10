import {TimesPerDayEnum} from 'domain/constants/medication.const';

export interface PatientMedication {
    id: string;

    patientUserId: string;

    genericName: string;

    brandNames: string[];

    dose: number | null;

    timesPerDay: TimesPerDayEnum | null;

    createdBy: string;

    createdAt: string;
}
