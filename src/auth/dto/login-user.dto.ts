import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    name: 'username',
    example: 'john.cena1',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    name: 'password',
    example: 'a63Ggvie73pd22j-Gdo',
  })
  @Length(8, 128)
  @IsString()
  password: string;
}
