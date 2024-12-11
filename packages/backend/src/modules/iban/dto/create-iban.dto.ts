import { IsString, Matches } from "class-validator";
import { IBAN_REGEX } from "../../../shared/const/reg-exp.const";

export class AddUserIbanDTO {
  @IsString()
  @Matches(IBAN_REGEX, {message:"Invalid IBAN"})
  public iban!: string

  @IsString()
  public userId!:string
}