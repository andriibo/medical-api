import {Controller, Get, Query, Post, Body, Put, Param, Delete} from '@nestjs/common';
import {CreateUserDto, UpdateUserDto} from './users.dto';

@Controller('users')
export class UsersController {
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} user`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} user`;
    }
}