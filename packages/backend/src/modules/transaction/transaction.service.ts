import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { Transaction } from '@prisma/client';
import { CreateTransactionDTO } from './dto/create-user-transaction.dto';
import { GetUserTransactionsDTO } from './dto/get-user-transactions.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) { }

  public async getUserTransactions({page = 1, perPage = 20, userId}:GetUserTransactionsDTO): Promise<Array<Transaction>>{
    const getUserTransactions = await this.prisma.transaction.findMany({
      where: {
        userId
      },
      orderBy: {
				updatedAt: 'desc',
      },
      
      skip:    Number(page - 1,) * Number(perPage,),
      take:    Number(perPage,),
    })

    return getUserTransactions || []
  }
  
  public async createTransaction( {amount,from,to,userId}:CreateTransactionDTO): Promise<Transaction>{
    const user = await this.prisma.user.findUnique({
      where:{id:userId}
    })
    if (!user) {
      throw new HttpException('Not Found', 404);
    }

    const fromIban = await this.prisma.userIban.findFirst({
      where: {
        userId: user.id,
        id: from
      }
    })

    if (!fromIban) {
      throw new HttpException('Not Found', 404);
    }

    if (fromIban.balance < amount) {
      throw new HttpException('Not enough balance', 400);
    }



    const newFromBalance = fromIban.balance - amount
    await this.prisma.userIban.update({
      where: {
        id: fromIban.id
      },
      data: {
        balance: newFromBalance
      }
    })

    const toIban = await this.prisma.userIban.findFirst({
      where: {
        iban: to
      }
    })

    if (toIban) {
      const newToIbanBalance = toIban.balance + amount
      await this.prisma.userIban.update({
        where: {
          id: toIban.id
        },
        data: {
          balance:newToIbanBalance
        }
      })
    }

  const newTransaction = await this.prisma.transaction.create({
      data: {
        amount: amount,
        currency: "USD",
        from: from,
        to: to,
        type: "SEND",
        userId: userId,
      }
  })
  return newTransaction
    
  }
}
