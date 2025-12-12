import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private databaseService;
    private jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    signup(signupDto: SignupDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
        };
    }>;
    validateUser(payload: any): Promise<any>;
}
