/** DTO pour POST /api/runs — date (ISO transformée en Date), durée en secondes, pattern JSON libre (ex: intervals) */
import { IsDate, IsInt, IsObject, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRunDto {
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsInt()
  @Min(0, { message: 'La durée doit être positive ou nulle' })
  durationSeconds: number;

  @IsObject()
  patternJson: Record<string, unknown>;
}
