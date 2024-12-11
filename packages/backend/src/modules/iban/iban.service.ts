import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { UserIban } from '@prisma/client';
import { AddUserIbanDTO } from './dto/create-iban.dto';

@Injectable()
export class IbanService {
  constructor(private readonly prisma: PrismaService) { }

  public async createIban({ iban, userId }: AddUserIbanDTO): Promise<UserIban>{
    try {
      const existedIban = await this.prisma.userIban.findFirst({
       where:{iban}
     })

      if (existedIban) {
        throw new HttpException('This IBAN already exist', 400);
      }

      const newIban = await this.prisma.userIban.create({
        data: {
          userId,
          currency: 'USD',
          iban
      }
   })
    return newIban
   } catch (error) {
      throw new HttpException('Bad request', 400);
   }
  } 


  public async getUsersIbans(userId): Promise<Array<UserIban>>{
    try {
      const userIbans = await this.prisma.userIban.findMany({
        where: {
          userId
        },
        orderBy: {
          createdAt:'asc'
        }
      })
      if (userIbans.length < 1) {
       throw new HttpException('Not Found', 404);
      }
      return userIbans
    } catch (error) {
       throw new HttpException('Not Found', 404);
    }
  }
}
