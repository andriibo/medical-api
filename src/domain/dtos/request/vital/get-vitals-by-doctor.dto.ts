export class GetVitalsByDoctorDto {
    public userId: string;

    public startDate: Date;

    public endDate: Date;

    public constructor(startDate: Date, endDate: Date, userId: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
    }
}
