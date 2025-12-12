import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private databaseService: DatabaseService) {}

  async create(createGameDto: CreateGameDto) {
    const { title, platform, score, genre, editors_choice = false } = createGameDto;

    const result = await this.databaseService.query(
      'INSERT INTO games (title, platform, score, genre, editors_choice) VALUES (?, ?, ?, ?, ?)',
      [title, platform, score, genre, editors_choice]
    );

    return this.findOne(result.insertId);
  }

  async findAll(platform?: string, genre?: string, editors_choice?: boolean, sortBy?: string, sortOrder?: string) {
    let query = 'SELECT * FROM games WHERE 1=1';
    const params = [];

    if (platform) {
      query += ' AND platform = ?';
      params.push(platform);
    }

    if (genre) {
      query += ' AND genre = ?';
      params.push(genre);
    }

    if (editors_choice !== undefined) {
      query += ' AND editors_choice = ?';
      params.push(editors_choice);
    }

    if (sortBy === 'score') {
      const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
      query += ` ORDER BY score ${order}`;
    }

    return this.databaseService.query(query, params);
  }

  async findOne(id: number) {
    const games = await this.databaseService.query(
      'SELECT * FROM games WHERE id = ?',
      [id]
    );

    if (games.length === 0) {
      throw new NotFoundException('Game not found');
    }

    return games[0];
  }

  async findByTitle(title: string) {
    return this.databaseService.query(
      'SELECT * FROM games WHERE title LIKE ?',
      [`%${title}%`]
    );
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(id);

    const fields = [];
    const params = [];

    Object.keys(updateGameDto).forEach(key => {
      if (updateGameDto[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(updateGameDto[key]);
      }
    });

    if (fields.length === 0) {
      return game;
    }

    params.push(id);

    await this.databaseService.query(
      `UPDATE games SET ${fields.join(', ')} WHERE id = ?`,
      params
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.databaseService.query(
      'DELETE FROM games WHERE id = ?',
      [id]
    );

    return { message: 'Game deleted successfully' };
  }
}