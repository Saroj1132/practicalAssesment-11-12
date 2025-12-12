import { DatabaseService } from './database.service';

export class GamesSeeder {
  constructor(private databaseService: DatabaseService) {}

  async seed() {
    const games = [
      { title: 'LittleBigPlanet PS Vita', platform: 'PlayStation Vita', score: 9, genre: 'Platformer', editors_choice: true },
      { title: 'LittleBigPlanet PS Vita -- Marvel Super Hero Edition', platform: 'PlayStation Vita', score: 9, genre: 'Platformer', editors_choice: true },
      { title: 'Splice: Tree of Life', platform: 'iPad', score: 8.5, genre: 'Puzzle', editors_choice: false },
      { title: 'NHL 13', platform: 'Xbox 360', score: 8.5, genre: 'Sports', editors_choice: false },
      { title: 'NHL 13', platform: 'PlayStation 3', score: 8.5, genre: 'Sports', editors_choice: false },
      { title: 'Total War Battles: Shogun', platform: 'Macintosh', score: 7, genre: 'Strategy', editors_choice: false },
      { title: 'Double Dragon: Neon', platform: 'Xbox 360', score: 3, genre: 'Fighting', editors_choice: false },
      { title: 'Guild Wars 2', platform: 'PC', score: 9, genre: 'RPG', editors_choice: true },
      { title: 'Double Dragon: Neon', platform: 'PlayStation 3', score: 3, genre: 'Fighting', editors_choice: false },
      { title: 'Total War Battles: Shogun', platform: 'PC', score: 7, genre: 'Strategy', editors_choice: false },
      { title: 'Tekken Tag Tournament 2', platform: 'PlayStation 3', score: 7.5, genre: 'Fighting', editors_choice: false },
      { title: 'Tekken Tag Tournament 2', platform: 'Xbox 360', score: 7.5, genre: 'Fighting', editors_choice: false },
      { title: 'Wild Blood', platform: 'iPhone', score: 7, genre: 'Action', editors_choice: false },
      { title: 'Mark of the Ninja', platform: 'Xbox 360', score: 9, genre: 'Action', editors_choice: true },
      { title: 'Mark of the Ninja', platform: 'PC', score: 9, genre: 'Action', editors_choice: true },
      { title: 'Home: A Unique Horror Adventure', platform: 'Macintosh', score: 6.5, genre: 'Adventure', editors_choice: false },
      { title: 'Home: A Unique Horror Adventure', platform: 'PC', score: 6.5, genre: 'Adventure', editors_choice: false },
      { title: 'Avengers Initiative', platform: 'iPhone', score: 8, genre: 'Action', editors_choice: false },
      { title: 'Way of the Samurai 4', platform: 'PlayStation 3', score: 5.5, genre: 'Action', editors_choice: false },
      { title: 'JoJo\'s Bizarre Adventure HD', platform: 'Xbox 360', score: 7, genre: 'Fighting', editors_choice: false },
      { title: 'JoJo\'s Bizarre Adventure HD', platform: 'PlayStation 3', score: 7, genre: 'Fighting', editors_choice: false },
      { title: 'Mass Effect 3: Leviathan', platform: 'Xbox 360', score: 7.5, genre: 'RPG', editors_choice: false },
      { title: 'Mass Effect 3: Leviathan', platform: 'PlayStation 3', score: 7.5, genre: 'RPG', editors_choice: false },
      { title: 'Mass Effect 3: Leviathan', platform: 'PC', score: 7.5, genre: 'RPG', editors_choice: false },
      { title: 'Dark Souls (Prepare to Die Edition)', platform: 'PC', score: 9, genre: 'Action', editors_choice: true },
      { title: 'Symphony', platform: 'PC', score: 7, genre: 'Shooter', editors_choice: false },
      { title: 'Bastion', platform: 'iPad', score: 9, genre: 'Action', editors_choice: true },
      { title: 'Tom Clancy\'s Ghost Recon Phantoms', platform: 'PC', score: 7.5, genre: 'Shooter', editors_choice: false },
      { title: 'Thirty Flights of Loving', platform: 'PC', score: 8, genre: 'Adventure', editors_choice: false },
      { title: 'Legasista', platform: 'PlayStation 3', score: 6.5, genre: 'Action', editors_choice: false },
      { title: 'The Walking Dead: The Game -- Episode 3: Long Road Ahead', platform: 'Macintosh', score: 9, genre: 'Adventure', editors_choice: true },
      { title: 'World of Warcraft: Mists of Pandaria', platform: 'PC', score: 8.7, genre: 'RPG', editors_choice: true },
      { title: 'Hell Yeah! Wrath of the Dead Rabbit', platform: 'PlayStation 3', score: 4.9, genre: 'Platformer', editors_choice: false },
      { title: 'Pokemon White Version 2', platform: 'Nintendo DS', score: 9.6, genre: 'RPG', editors_choice: true },
      { title: 'War of the Roses', platform: 'PC', score: 7.3, genre: 'Action', editors_choice: false },
      { title: 'Pokemon Black Version 2', platform: 'Nintendo DS', score: 9.6, genre: 'RPG', editors_choice: true },
      { title: 'Drakerider', platform: 'iPhone', score: 6.5, genre: 'RPG', editors_choice: false },
      { title: 'The Walking Dead: The Game -- Episode 3: Long Road Ahead', platform: 'Xbox 360', score: 9, genre: 'Adventure', editors_choice: true },
      { title: 'The Walking Dead: The Game -- Episode 3: Long Road Ahead', platform: 'PC', score: 9, genre: 'Adventure', editors_choice: true },
      { title: 'The Walking Dead: The Game -- Episode 3: Long Road Ahead', platform: 'PlayStation 3', score: 9, genre: 'Adventure', editors_choice: true },
      { title: 'Rock Band Blitz', platform: 'Xbox 360', score: 8.5, genre: 'Music', editors_choice: true },
      { title: 'Counter-Strike: Global Offensive', platform: 'Macintosh', score: 8, genre: 'Shooter', editors_choice: false },
      { title: 'Worms Revolution', platform: 'PlayStation 3', score: 8.5, genre: 'Strategy', editors_choice: false },
      { title: 'Worms Revolution', platform: 'PC', score: 8.5, genre: 'Strategy', editors_choice: false },
      { title: 'Worms Revolution', platform: 'Xbox 360', score: 8.5, genre: 'Strategy', editors_choice: false },
      { title: 'Bad Piggies', platform: 'iPhone', score: 9.2, genre: 'Action', editors_choice: true },
      { title: 'Resident Evil 6', platform: 'PlayStation 3', score: 7.9, genre: 'Action', editors_choice: false },
      { title: 'Resident Evil 6', platform: 'Xbox 360', score: 7.9, genre: 'Action', editors_choice: false },
      { title: 'Shad\'O', platform: 'PC', score: 7, genre: 'Adventure', editors_choice: false },
      { title: 'Demon\'s Score', platform: 'iPhone', score: 6.9, genre: 'Action', editors_choice: false },
      { title: 'NBA 2K13', platform: 'Xbox 360', score: 9.1, genre: 'Sports', editors_choice: true },
      { title: 'Counter-Strike: Global Offensive', platform: 'PC', score: 8, genre: 'Shooter', editors_choice: false },
      { title: 'The World Ends with You: Solo Remix', platform: 'iPad', score: 9.5, genre: 'RPG', editors_choice: true },
      { title: 'Counter-Strike: Global Offensive', platform: 'PlayStation 3', score: 8, genre: 'Shooter', editors_choice: false },
      { title: 'The World Ends with You: Solo Remix', platform: 'iPhone', score: 9.5, genre: 'RPG', editors_choice: true },
      { title: 'Counter-Strike: Global Offensive', platform: 'Xbox 360', score: 8, genre: 'Shooter', editors_choice: false },
      { title: 'Madden NFL 13', platform: 'PlayStation Vita', score: 6, genre: 'Sports', editors_choice: false },
      { title: 'Madden NFL 13', platform: 'PlayStation 3', score: 9, genre: 'Sports', editors_choice: true },
      { title: 'Madden NFL 13', platform: 'Xbox 360', score: 9, genre: 'Sports', editors_choice: true },
      { title: 'Hoodwink', platform: 'PC', score: 2.5, genre: 'Adventure', editors_choice: false },
      { title: 'NBA 2K13', platform: 'PlayStation 3', score: 9.1, genre: 'Sports', editors_choice: true },
      { title: 'NBA 2K13', platform: 'PC', score: 9.1, genre: 'Sports', editors_choice: true },
      { title: 'Lili: Child of Geos', platform: 'iPhone', score: 7, genre: 'Adventure', editors_choice: false },
      { title: 'Marvel vs. Capcom Origins', platform: 'Xbox 360', score: 8.2, genre: 'Fighting', editors_choice: false },
      { title: 'Marvel vs. Capcom Origins', platform: 'PlayStation 3', score: 8.2, genre: 'Fighting', editors_choice: false },
      { title: 'Dead or Alive 5', platform: 'PlayStation 3', score: 8.8, genre: 'Fighting', editors_choice: false },
      { title: 'Dead or Alive 5', platform: 'Xbox 360', score: 8.8, genre: 'Fighting', editors_choice: false },
      { title: 'Medal of Honor Warfighter', platform: 'PC', score: 4, genre: 'Shooter', editors_choice: false },
      { title: 'Professor Layton and the Miracle Mask', platform: 'Nintendo 3DS', score: 8.7, genre: 'Adventure', editors_choice: true },
      { title: 'Hotline Miami', platform: 'PC', score: 8.8, genre: 'Action', editors_choice: true },
      { title: 'Edna & Harvey: Harvey\'s New Eyes', platform: 'PC', score: 6, genre: 'Adventure', editors_choice: false },
      { title: 'Medal of Honor Warfighter', platform: 'PlayStation 3', score: 4, genre: 'Shooter', editors_choice: false },
      { title: 'Medal of Honor Warfighter', platform: 'Xbox 360', score: 4, genre: 'Shooter', editors_choice: false },
      { title: 'Transformers: Fall of Cybertron', platform: 'Xbox 360', score: 8.5, genre: 'Shooter', editors_choice: false },
      { title: 'Transformers: Fall of Cybertron', platform: 'PlayStation 3', score: 8.5, genre: 'Shooter', editors_choice: false },
      { title: 'Hero Academy', platform: 'PC', score: 9, genre: 'Board', editors_choice: true },
      { title: 'Hero Academy', platform: 'iPhone', score: 9, genre: 'Strategy', editors_choice: true },
      { title: 'Puzzle Craft', platform: 'iPhone', score: 9, genre: 'Puzzle', editors_choice: true },
      { title: 'Realms Of Ancient War', platform: 'Xbox 360', score: 5.5, genre: 'Action', editors_choice: false },
      { title: 'Realms Of Ancient War', platform: 'PlayStation 3', score: 5.5, genre: 'Action', editors_choice: false },
      { title: 'Anomaly: Warzone Earth', platform: 'PlayStation 3', score: 8.2, genre: 'Action', editors_choice: false },
      { title: 'Darksiders II', platform: 'PC', score: 7.5, genre: 'Action', editors_choice: false },
      { title: 'Left 4 Dead 2: Cold Stream', platform: 'Macintosh', score: 7, genre: 'Shooter', editors_choice: false },
      { title: 'Left 4 Dead 2: Cold Stream', platform: 'PC', score: 7, genre: 'Shooter', editors_choice: false },
      { title: 'Puzzle Craft', platform: 'Android', score: 9, genre: 'Puzzle', editors_choice: true },
      { title: 'Left 4 Dead 2: Cold Stream', platform: 'Xbox 360', score: 7, genre: 'Shooter', editors_choice: false },
      { title: 'Horn', platform: 'iPhone', score: 9, genre: 'Action', editors_choice: true },
      { title: 'Forza Horizon', platform: 'Xbox 360', score: 9, genre: 'Racing', editors_choice: true },
      { title: 'FIFA Soccer 13', platform: 'PlayStation Vita', score: 4, genre: 'Sports', editors_choice: false },
      { title: 'Mugen Souls', platform: 'PlayStation 3', score: 3.9, genre: 'Strategy', editors_choice: false },
      { title: 'Crazy Taxi', platform: 'iPhone', score: 7.1, genre: 'Racing', editors_choice: false },
      { title: 'New Little King\'s Story', platform: 'PlayStation Vita', score: 5.8, genre: 'RPG', editors_choice: false },
      { title: 'Fable: The Journey', platform: 'Xbox 360', score: 7.2, genre: 'Action', editors_choice: false },
      { title: 'The Lord of the Rings Online: Riders of Rohan', platform: 'PC', score: 8.3, genre: 'RPG', editors_choice: false },
      { title: 'Doom 3: BFG Edition', platform: 'Xbox 360', score: 7.6, genre: 'RPG', editors_choice: false },
      { title: 'Rugby League Live 2', platform: 'Xbox 360', score: 6, genre: 'Sports', editors_choice: false },
      { title: 'Rugby League Live 2', platform: 'PlayStation 3', score: 6, genre: 'Sports', editors_choice: false },
      { title: 'Doom 3: BFG Edition', platform: 'PlayStation 3', score: 7.6, genre: 'RPG', editors_choice: false },
      { title: 'Punch Quest', platform: 'iPhone', score: 9.3, genre: 'Action', editors_choice: true }
    ];

    console.log('Starting games seeding...');
    
    for (const game of games) {
      try {
        await this.databaseService.query(
          'INSERT INTO games (title, platform, score, genre, editors_choice) VALUES (?, ?, ?, ?, ?)',
          [game.title, game.platform, game.score, game.genre, game.editors_choice]
        );
      } catch (error) {
        console.error(`Error inserting game: ${game.title}`, error.message);
      }
    }

    console.log(`✅ Successfully seeded ${games.length} games!`);
  }
}