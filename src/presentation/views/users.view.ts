import { ApiProperty } from '@nestjs/swagger';

class UserView {
  @ApiProperty()
  name: string;
}

export class CreateUserView extends UserView {}

export class UpdateUserView extends UserView {}
