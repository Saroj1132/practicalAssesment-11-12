"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const database_service_1 = require("../database/database.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async signup(signupDto) {
        const { email, password } = signupDto;
        const existingUser = await this.databaseService.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await this.databaseService.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        const payload = { email, sub: result.insertId };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            user: { id: result.insertId, email }
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const users = await this.databaseService.query('SELECT id, email, password FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            user: { id: user.id, email: user.email }
        };
    }
    async validateUser(payload) {
        const users = await this.databaseService.query('SELECT id, email FROM users WHERE id = ?', [payload.sub]);
        if (users.length === 0) {
            throw new common_1.UnauthorizedException();
        }
        return users[0];
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map