import { IsNumber, IsString, Matches } from "class-validator";
import { IBAN_REGEX } from "../../../shared/const/reg-exp.const";

export class MakeWithdrawDTO {
  @IsNumber()
  public amount!: number

  @IsString()
  public id!: string
  
  @IsString()
  @Matches(IBAN_REGEX, {message:"Invalid IBAN"})
  public to!:string
}