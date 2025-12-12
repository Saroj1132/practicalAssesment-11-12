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
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let GamesService = class GamesService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createGameDto) {
        const { title, platform, score, genre, editors_choice = false } = createGameDto;
        const result = await this.databaseService.query('INSERT INTO games (title, platform, score, genre, editors_choice) VALUES (?, ?, ?, ?, ?)', [title, platform, score, genre, editors_choice]);
        return this.findOne(result.insertId);
    }
    async findAll(platform, genre, editors_choice, sortBy, sortOrder) {
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
    async findOne(id) {
        const games = await this.databaseService.query('SELECT * FROM games WHERE id = ?', [id]);
        if (games.length === 0) {
            throw new common_1.NotFoundException('Game not found');
        }
        return games[0];
    }
    async findByTitle(title) {
        return this.databaseService.query('SELECT * FROM games WHERE title LIKE ?', [`%${title}%`]);
    }
    async update(id, updateGameDto) {
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
        await this.databaseService.query(`UPDATE games SET ${fields.join(', ')} WHERE id = ?`, params);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.databaseService.query('DELETE FROM games WHERE id = ?', [id]);
        return { message: 'Game deleted successfully' };
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], GamesService);
//# sourceMappingURL=games.service.js.map