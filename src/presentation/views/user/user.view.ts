import {ApiProperty} from '@nestjs/swagger';
import {User} from 'domain/entities/user.entity';

export class UserView {
    @ApiProperty()
    public userId: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    static fromUser(user: User): UserView {
        const view = new UserView();
        view.userId = user.userId;
        view.email = user.email;
        view.firstName = user.firstName;
        view.lastName = user.lastName;

        return view;
    }
}
