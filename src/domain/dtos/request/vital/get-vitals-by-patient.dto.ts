export class GetVitalsByPatientDto {
    public startDate: Date;

    public endDate: Date;

    public constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
