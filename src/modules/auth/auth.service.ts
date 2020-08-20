import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    console.log('auth-service-user:', user);
    const payload = { username: user.username, sub: user.userId };
    return {
      code: 200,
      message: '登录成功',
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserInfo(token: string): Promise<any> {
    const user = this.jwtService.verify(token.replace('Bearer ', ''));
    return this.usersService.findUser(!!user ? user.username : '');
  }
}
