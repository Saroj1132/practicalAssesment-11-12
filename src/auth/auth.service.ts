import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password } = signupDto;

    const existingUser = await this.databaseService.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.databaseService.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    const payload = { email, sub: result.insertId };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: { id: result.insertId, email }
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const users = await this.databaseService.query(
      'SELECT id, email, password FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: { id: user.id, email: user.email }
    };
  }

  async validateUser(payload: any) {
    const users = await this.databaseService.query(
      'SELECT id, email FROM users WHERE id = ?',
      [payload.sub]
    );

    if (users.length === 0) {
      throw new UnauthorizedException();
    }

    return users[0];
  }
}