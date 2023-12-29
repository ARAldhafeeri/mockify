# stage 1 building the react app
FROM node:16-alpine as adminBuild

WORKDIR /adminPortal

COPY /package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_API_URL=http://localhost:5000

RUN npm run build

# stage 2 - the production environment
FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=adminBuild /adminPortal/build /usr/share/nginx/html

EXPOSE 3007