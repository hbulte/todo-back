import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
User;
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() newUser: Object) {
    return await this.usersService.createUser(newUser);
  }
}
