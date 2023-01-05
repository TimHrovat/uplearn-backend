import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    name: 'username',
    example: 'john.cena',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    name: 'email',
    example: 'john.cena@uplearn.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    example: 'john.cena',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
