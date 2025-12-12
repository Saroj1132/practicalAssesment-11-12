import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private connection: mysql.Connection;

  constructor(private configService: ConfigService) {}

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
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
    }
  }

  private async createTables() {
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
      const { GamesSeeder } = await import('./games.seeder');
      const seeder = new GamesSeeder(this);
      await seeder.seed();
    }
  }

  getConnection(): mysql.Connection {
    return this.connection;
  }

  async query(sql: string, params?: any[]): Promise<any> {
    try {
      if (!this.connection) {
        throw new Error('Database connection not established');
      }
      const [rows] = await this.connection.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }
}