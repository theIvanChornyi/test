import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDTO } from './dto/create-user-transaction.dto';
import { GetUserTransactionsDTO } from './dto/get-user-transactions.dto';

@Controller('transaction')
export class TransactionController {

  constructor(private readonly transactionService: TransactionService) { }
  
  @Post('create')
  public async makeTransaction(@Body() data: CreateTransactionDTO) {
    return this.transactionService.createTransaction(data)
  }

  @Get()
  public async getUserTransactions(@Query() userData: GetUserTransactionsDTO,) {
    return this.transactionService.getUserTransactions(userData)
  }
}
