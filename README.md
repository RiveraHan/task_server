# Task Server
This is a server-side application for a task management system. It is built using Node.js, Express, and MongoDB.

## Getting Started
### Prerequisites
- Node.js
- Express
- MongoDB
- Docker
- Docker Compose

## Installation & Run
### Clone the repo:

```bash
git clone https://github.com/RiveraHan/task_server.git
```
### Navigate to the project directory:

```bash
cd task-server
```
### Install dependencies

```bash
npm install
```


### Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables (if needed)
```

### Run the server

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

Testing:

```bash
# run all tests
npm run test
# run all tests in watch mode
npm run test:watch
# run test coverage
npm run coverage
```

Docker:

```bash
# run docker container in development mode
npm run docker:dev
# run docker container in production mode
npm run docker:prod
# run all tests in a docker container
npm run docker:test
```

Linting:

```bash
# run ESLint
npm run lint
# fix ESLint errors
npm run lint:fix
# run prettier
npm run prettier
# fix prettier errors
npm run prettier:fix
```

The app should now be running on http://localhost:4000.