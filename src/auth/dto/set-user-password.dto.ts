import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class SetUserPasswordDto extends PartialType(LoginUserDto) {
  @ApiProperty({
    name: 'newPassword',
    example: 'a63Ggvie73pd22j-Gdo',
  })
  @IsString()
  @Length(8, 128)
  newPassword: string;
}
