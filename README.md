Simple web-based audio player. **Work in Progress**

The application consists of 2 main parts:

- REST API serving songs and metadata, powered by `express.js` [_Work in Progress_]
- Frontend, powered by `react.js` [_Work in Progress_]

# Run it locally

Requires Docker & modern node environment with yarn/npm.

## First-time run

Rename `.env.example` to `.env`:

`mv .env{.example,}`

Optionally, change values in `.env`.

Setup Postgres container:

`docker-compose up -d --build`

Install packages:

`yarn`

Run database migrations:

`yarn data:migrate`

Optionally, seed database with test data (each run will clear old values and generate new ones):

`yarn data:seed`

## Run the API

Run development version of the API:

`yarn dev`

By default, the API will be available at: `http://localhost:3001/api/v1/`.

## API structure

`.env` defines API URL prefix, the default one is: `/api/v1` (I prefer to introduce API versionning from the beginning). For clarity, the prefix is not included in the documented endpoints below.

### List Songs (paginated)

**GET** `/songs`

**Query Params**:

- `page` (`number`, default: `1`) -- page number
- `limit` (`number`, default: `10`, value range: [10, 100]) -- number of songs to show per page
- `expand` (`bool`, default: `false`) -- whether to expand `album` & `artist` (by default only `album_id` and `artist_id` are present)

**Successful response structure**

- `success: true`
- `meta` (`object`) -- info about the page and request:

  - `expand`
  - `page`
  - `limit`
  - `total_songs`
  - `has_more`

- `data` (`array`) -- array of song objects (see **Single Song** for song object structure)

**Error response structure**

- `success: false`
- `message` - error message

### Single Song

**GET** `/songs/:id`

`:id` -- song `id`

**Query Params**:

- `expand` (`bool`, default: `false`) -- whether to expand `album` & `artist` (by default only `album_id` and `artist_id` are present)

**Successful response structure**

- `success: true`
- `data` (`object`) -- song object:
  - `id` - song ID
  - `title`
  - `album_id` (not expanded) OR `album` (`object` when expanded, with `id` and `name` properties)
  - `artist_id` (not expanded) OR `artist` (`object` when expanded, with `id` and `name` properties)

**Error response structure**

- `success: false`
- `message` - error message

# Technical Choices

## Tools

- eslint & prettier -- maintain code style and formatting
- PotgreSQL -- preferred database I'm familiar with
- Docker -- easy way for runing Postgres locally
- knex.js -- query builder I'm familiar with & nice migration and seed CLI

## Architecture

Since the application is so simple, there's no need for overengineering, crazy DI frameworks or CQRS. I've tried to split the application into 3 layers:

- application layer -- runs the server, manages the base configuration
- controllers -- handle request/response cycle
- "model" queries -- interaction with the database

so future refactors will be easier and (when needed) contained within specific layer.

## Things to improve

- add tests
- better error handling
- extract logic for pagination response structure

### Side note about seed data

For the seed/test data, I've created "random" generators for artists, albums and songs names, based on `faker.js`. This was just for fun :). Some names I've enjoyed: "Intelligent Practical Metal Hat", "Practical Yellow", "Intelligent Back-end".
