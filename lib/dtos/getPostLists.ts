import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class GetPostListsDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  offset!: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  pageSize!: number;
}
