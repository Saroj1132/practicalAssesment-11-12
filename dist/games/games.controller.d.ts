import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    create(createGameDto: CreateGameDto): Promise<any>;
    findAll(platform?: string, genre?: string, editors_choice?: boolean, sortBy?: string, sortOrder?: string): Promise<any>;
    searchByTitle(title: string): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateGameDto: UpdateGameDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
