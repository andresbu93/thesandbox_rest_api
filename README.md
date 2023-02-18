# Introduction

This project create a basic backend for authenticate users and create/update/delete/get tutorials.

# Tech

- NodeJS
- Typescript
- Express
- MySQL
- Docker & docker-compose
- Postman

# Build & Run

Create a file in the root path `.env` with the basic needed configuration to run the project.
You can create one based on the `env-sample` file

Run `docker-compose up --build`

To migrate the database and create the seed users run:

1. `docker exec -it thesandbox_rest_api_app_1 sh`
2. `NODE_ENV=dev npx sequelize-cli db:migrate --config src/config/config.json --migrations-path src/db/migrations`
3. `NODE_ENV=dev npx sequelize-cli db:seed:all --config src/config/config.json --seeders-path src/db/seeders`

# Usage

Use the `thesandbox.postman_collection.json` to import the Postman collection. There is a folder with the user's requests and another with the tutorial's requests.
