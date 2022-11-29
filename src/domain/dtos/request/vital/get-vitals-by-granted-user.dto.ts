export class GetVitalsByGrantedUserDto {
    public patientUserId: string;

    public startDate: Date;

    public endDate: Date;

    public constructor(startDate: Date, endDate: Date, patientUserId: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.patientUserId = patientUserId;
    }
}
