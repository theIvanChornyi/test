import { IsNumber, IsString, } from "class-validator";
import { PaginationDto } from "../../../shared/dto/pagination.dto";

export class GetUserTransactionsDTO extends PaginationDto {
  @IsString()
  public userId!: string
}