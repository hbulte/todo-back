import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username, password) {
    const user = await this.usersService.findOne(username);
    const hashToTest = await bcrypt.hash(password, user.salt);
    if (user && hashToTest === user.hash) {
      const { hash, salt, createdAt, updatedAt, deletedAt, email, ...result } =
        user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
