import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authcredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authcredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authcredentialsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  me(@GetUser() user: User) {
    return {
      id: user.id,
      username: user.username,
    };
  }
}
