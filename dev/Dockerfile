FROM nginx:alpine


COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*


EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]