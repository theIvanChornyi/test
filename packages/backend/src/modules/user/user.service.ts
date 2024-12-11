import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  
  public async getUserById(id: string): Promise<User>{
    const user = await this.prisma.user.findUnique({
      where:{id}
    })

    if (user) {
      return user
    }
    throw new HttpException('Not found', 404);
   }
  
  public async createNewUser(): Promise<User>{
    try {
      const user = await this.prisma.user.create({
        data:{}
      })
      return user
    } catch (error) {
      throw new HttpException('Bad request', 400);
    }
  }
}
