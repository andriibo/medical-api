export class CreateMedicationDto {
    public patientUserId: string;

    public genericName: string;

    public brandNames: string[];

    public dose: number;

    public timesPerDay: string;
}
