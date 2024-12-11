import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakeDepositDTO } from './dto/make-deposit.dto';
import { MakeWithdrawDTO } from './dto/make-withdraw.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService){}

  @Post('deposit')
  public async makeDeposit(@Body() data:MakeDepositDTO): Promise<any>{
    return this.paymentService.makeDeposit(data)
  }

  @Post('withdraw')
  public async makeWithdraw(@Body() data:MakeWithdrawDTO): Promise<any>{
    return this.paymentService.makeWithdraw(data)
  }

}
