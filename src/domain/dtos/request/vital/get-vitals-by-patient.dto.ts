export class GetVitalsByPatientDto {
    public startDate: Date;

    public endDate: Date;

    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
