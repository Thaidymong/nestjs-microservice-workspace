import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginDTO } from 'libs/common/dto';
import { Public } from 'libs/common/decorators';

@ApiTags('Authentication')
@Controller({
  path: 'auth',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Register a new user' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: CreateUserDto })
  async registerUser(@Body() input: CreateUserDto) {
    return this.userService.register(input);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Login successfully' })
  @ApiBody({ type: LoginDTO })
  async login(@Body() input: LoginDTO) {
    return this.userService.login(input);
  }
}
