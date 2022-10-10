import {ApiProperty} from '@nestjs/swagger';

export class UserSignedInView {
    @ApiProperty()
    public token: string;

    static fromToken(token: string): UserSignedInView {
        const view = new UserSignedInView();
        view.token = token;

        return view;
    }
}
