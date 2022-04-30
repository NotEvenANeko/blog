import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class RevalidateHeaderDto {
  @IsNotEmpty()
  authorization!: string;
}

export class RevalidateBodyDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @Type(() => String)
  paths!: string[];
}
