import { DatabaseService } from './database.service';
export declare class GamesSeeder {
    private databaseService;
    constructor(databaseService: DatabaseService);
    seed(): Promise<void>;
}
