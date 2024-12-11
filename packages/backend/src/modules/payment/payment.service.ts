import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { MakeDepositDTO } from './dto/make-deposit.dto';
import { MakeWithdrawDTO } from './dto/make-withdraw.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) { }


  public async makeDeposit({ id, amount }:MakeDepositDTO) {
    const currentIban = await this.prisma.userIban.findUnique({
      where: {
        id
      }
    }) 
    
    if (!currentIban) {
      throw new HttpException('Not Found', 404);
    }

    const newBalance = currentIban.balance + amount

    await this.prisma.transaction.create({
      data: {
        amount,
        currency: "USD",
        from: "External Bank",
        to: currentIban.iban,
        userId: currentIban.userId,
        type:"DEPOSIT"
      }
    })
    return await this.prisma.userIban.update({
      where: {
        id
      },
      data: {
        balance: newBalance
      }
    })
  }

  public async makeWithdraw({ id, amount,to }:MakeWithdrawDTO) {
    const currentIban = await this.prisma.userIban.findUnique({
      where: {
      id
      }
    }) 
    
    if (!currentIban) {
      throw new HttpException('Not Found', 404);
    }

    if (currentIban.balance < amount) {
      throw new HttpException('Not enough balance', 400);
    }



    const newBalance = currentIban.balance - amount

    await this.prisma.transaction.create({
      data: {
        amount,
        currency: "USD",
        to: "External Bank",
        from: currentIban.iban,
        userId: currentIban.userId,
        type:"WITHDRAW"
      }
    })

    return await this.prisma.userIban.update({
      where: {
        id
      },
      data: {
        balance: newBalance
      }
    })
  }

}
