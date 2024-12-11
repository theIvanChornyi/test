import { IsNumber, IsString, Matches, Min } from "class-validator";
import { IBAN_REGEX } from "../../../shared/const/reg-exp.const";

export class CreateTransactionDTO {
  @IsString()
  public userId!:string

  @IsString()
  @Matches(IBAN_REGEX, {message:"Invalid from IBAN"})
  public from!: string

  @IsString()
  @Matches(IBAN_REGEX, {message:"Invalid to IBAN"})
  public to!: string
  
  @IsNumber()
  @Min(0.1)
  public amount!: number
}