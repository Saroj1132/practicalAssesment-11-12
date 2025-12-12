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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mysql = require("mysql2/promise");
let DatabaseService = class DatabaseService {
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        try {
            const tempConnection = await mysql.createConnection({
                host: this.configService.get('DB_HOST'),
                port: this.configService.get('DB_PORT'),
                user: this.configService.get('DB_USERNAME'),
                password: this.configService.get('DB_PASSWORD'),
            });
            await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS ${this.configService.get('DB_DATABASE')}`);
            await tempConnection.end();
            this.connection = await mysql.createConnection({
                host: this.configService.get('DB_HOST'),
                port: this.configService.get('DB_PORT'),
                user: this.configService.get('DB_USERNAME'),
                password: this.configService.get('DB_PASSWORD'),
                database: this.configService.get('DB_DATABASE'),
            });
            await this.createTables();
            console.log('✅ Database connection successful!');
        }
        catch (error) {
            console.error('❌ Database connection failed:', error.message);
        }
    }
    async createTables() {
        const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        const createGamesTable = `
      CREATE TABLE IF NOT EXISTS games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        platform VARCHAR(100) NOT NULL,
        score DECIMAL(3,1) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        editors_choice BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
        await this.connection.execute(createUsersTable);
        await this.connection.execute(createGamesTable);
        const [existingGames] = await this.connection.execute('SELECT COUNT(*) as count FROM games');
        if (existingGames[0].count === 0) {
            const { GamesSeeder } = await Promise.resolve().then(() => require('./games.seeder'));
            const seeder = new GamesSeeder(this);
            await seeder.seed();
        }
    }
    getConnection() {
        return this.connection;
    }
    async query(sql, params) {
        try {
            if (!this.connection) {
                throw new Error('Database connection not established');
            }
            const [rows] = await this.connection.execute(sql, params);
            return rows;
        }
        catch (error) {
            console.error('Query error:', error);
            throw error;
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
//# sourceMappingURL=database.service.js.map