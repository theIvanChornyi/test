import { IsNumber, IsString } from "class-validator";

export class MakeDepositDTO {
  @IsNumber()
  public amount!: number

  @IsString()
  public id!:string
}