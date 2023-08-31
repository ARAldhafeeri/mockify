# mockify
Mockify is an open-source, low-code secure platform that allows development teams to create and manage mock API endpoints for multiple projects.

## Motivation 
Mocking APIs is a very important step in API-first design. Allow development teams frontend and backend to work in parallel. Instead of having backend developers finish endpoints first, frontend developers start with UI development activities. Backend developers or frontend developers can create mock API endpoints on mockify to speed up the development process and understand the business logic better.

## Mockify features v1.0.0:
- [ ] admin portal to manage uers, authentication, authorization, policies and users curds endpoints (v0.1.0)
- [ ] Mock response (v0.2.0)
- [ ] Project curd endpoints and ui on admin portal (v0.3.0)
- [ ] Mock complex business logic via NodeJS serverless functions (v0.4.0)
- [ ] Manage resources mock data end points and user interface in admin portal (v0.5.0)
- [ ] Mock common API endpoint functionalities like filteration and pagination, search (v0.6.0)
- [ ] Validate request, response, and headers via NodeJS user defined serverless functions using VineJS. (v0.8.0)
- [ ] Deployable docker container for mockify self managed (v0.9.0) beta release
- [ ] use gateWatchJs [to](https://github.com/ARAldhafeeri/gatewatch/tree/main) to mock dynmaic Role based Access control


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


### deployment 
1- build and run mockify docker container
```bash
docker-compose --env-file=./server/.env build
```
2- run integration tests
```bash
npm run test:integration
```
from within the docker container
3- run mockify docker container
```bash
docker-compose --env-file=./server/.env up -d
```

