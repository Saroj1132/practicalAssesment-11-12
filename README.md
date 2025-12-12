# Games API

NestJS REST API for games management with JWT authentication.

## Quick Start

```bash
npm install
npm run start:dev
```

Server runs on: http://localhost:3000

## API Endpoints

### Auth
- `POST /auth/signup` - Register
- `POST /auth/login` - Login

### Games (Requires JWT Token)
- `POST /games` - Add game
- `GET /games` - Get all games
- `GET /games/search?title=name` - Search by title
- `GET /games/:id` - Get single game
- `PATCH /games/:id` - Update game
- `DELETE /games/:id` - Delete game

## Filters & Sorting

```
GET /games?platform=PC
GET /games?genre=RPG
GET /games?editors_choice=true
GET /games?sortBy=score&sortOrder=desc
```

## Environment Setup

Create `.env` file:
```
DB_HOST=aasvaa-legal.cluster-cfw2guwkm5ct.us-west-2.rds.amazonaws.com
DB_PORT=3306
DB_USERNAME=admin
DB_PASSWORD=Tn9TdWF97ZSSNZRjykE4
DB_DATABASE=practicalAssesment
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h
```

## Features

- JWT Authentication
- Input Validation
- MySQL Database
- Auto-seeded with 99 games
- Error Handling