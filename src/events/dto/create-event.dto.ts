import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    name: 'date',
    example: '2017-07-21T17:32:28Z',
  })
  @IsNotEmpty()
  @IsDate()
  date: string;

  @ApiProperty({
    name: 'startTime',
    example: '12:30',
  })
  @IsString()
  startTime?: string;

  @ApiProperty({
    name: 'startTime',
    example: '13:30',
  })
  @IsString()
  endTime?: string;

  @ApiProperty({
    name: 'type',
    example: 'ACT',
  })
  @IsNotEmpty()
  @IsEnum(EventType)
  type: EventType;

  @ApiProperty({
    name: 'description',
    example: 'This is an event',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    name: 'employees',
    example:
      '[0f83668c-9f55-45c0-a285-382fac75835f, 0f83268c-9f55-45c0-a285-382fac75835f]',
  })
  employees: string[];

  @ApiProperty({
    name: 'classes',
    example: '[R1A, R3A, 2A]',
  })
  classes: string[];
}
