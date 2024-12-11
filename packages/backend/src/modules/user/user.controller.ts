import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  public async createUser():Promise<User> { 
    return this.userService.createNewUser()
  }

  @Get(':id')
  public async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id)
  }
}
