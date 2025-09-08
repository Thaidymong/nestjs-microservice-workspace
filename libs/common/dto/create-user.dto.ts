import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    default: 'Dymong',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    default: 'thaidymong7@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    default: 'Dymong@100',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
