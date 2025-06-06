# mockify

Mockify is an open-source, low-code secure platform that allows development teams to create and manage mock API endpoints for multiple projects.

Home page: https://araldhafeeri.github.io/mockify-landing-page/
Docs: https://araldhafeeri.github.io/mockify-docs-portal/

API docs : http://localhost:5000/v1/docs/

## Motivation 

Mocking APIs is a very important step in API-first design. Allow development teams frontend and backend to work in parallel. Instead of having backend developers finish endpoints first, frontend developers start with UI development activities. Backend developers or frontend developers can create mock API endpoints on mockify to speed up the development process and understand the business logic better.

## running development environment :

1- build and run mockify docker container

```bash
docker compose -f docker-compose.dev.yml build
```

2- run mockify docker container for server

```bash
docker compose -f docker-compose.dev.yml up -d
```

3- run client using npm start, tsch --watch

```bash
npm run start
```

## running integration tests

1- build and run mockify docker container

```bash
docker-compose --env-file=./server/.env build
```

2- run integration tests

```bash
npm run test:integration
```

from within the docker container
note: recommended ci/cd : with docker images build and run

running unit tests

```
npm test tests/unit
```

### deployment

1- build and run mockify docker container

```bash
docker-compose --env-file=./server/.env build
```

2- run integration tests from within the docker container

```bash
npm run test:integration
```

3- run mockify docker container

```bash
docker-compose --env-file=./server/.env up -d
```
