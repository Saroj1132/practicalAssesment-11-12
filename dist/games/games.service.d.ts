import { DatabaseService } from '../database/database.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
export declare class GamesService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    create(createGameDto: CreateGameDto): Promise<any>;
    findAll(platform?: string, genre?: string, editors_choice?: boolean, sortBy?: string, sortOrder?: string): Promise<any>;
    findOne(id: number): Promise<any>;
    findByTitle(title: string): Promise<any>;
    update(id: number, updateGameDto: UpdateGameDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
