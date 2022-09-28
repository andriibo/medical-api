import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserView, UpdateUserView } from 'views/users.view';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  @Post()
  create(@Body() createUserView: CreateUserView) {
    return 'This action adds a new user';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserView: UpdateUserView) {
    return `This action updates a #${id} user`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
