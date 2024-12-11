import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IbanService } from './iban.service';
import { UserIban } from '@prisma/client';
import { AddUserIbanDTO } from './dto/create-iban.dto';

@Controller('iban')
export class IbanController {
  constructor(private readonly ibanService:IbanService) {
    
  }

  @Post('add')
  public async addUserIban(@Body() data:AddUserIbanDTO): Promise<UserIban>{
    return this.ibanService.createIban(data)
  }


  @Get(':id')
  public async getAllUserIbans(@Param('id')userId:string): Promise<Array<UserIban>> {
    return this.ibanService.getUsersIbans(userId)
  }
}
