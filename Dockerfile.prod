FROM nginx:1.16.1-alpine

# Add dependencies
RUN apk add git \
  gcc \
  g++ \
  make \
  automake \
  curl \
  autoconf \
  libtool \
  pcre \
  pcre-dev \
  libxml2 \
  libxml2-dev \
  linux-headers \
  wget 

# add yajl library to enable json logging in modsecurity
RUN apk add yajl-dev

# Compiling modsecurity code
RUN git clone --depth 1 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity && \
  cd ModSecurity && \
  git submodule init && \
  git submodule update && \
  ./build.sh && \
  ./configure && \
  make && \
  make install





# Compiling modsecurity connector for nginx & enabling geoip module
RUN ORIGINAL_CONFIG=$(nginx -V 2>&1 | sed -n -e 's/^.*arguments: //p') \
  git clone --depth 1 https://github.com/SpiderLabs/ModSecurity-nginx.git && \
  wget "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -O nginx.tar.gz && \
  tar -xvzmf nginx.tar.gz && \
  cd "nginx-${NGINX_VERSION}" && \
  ./configure --with-compat $ORIGINAL_CONFIG --add-dynamic-module=../ModSecurity-nginx && \
  make modules && \
  cp objs/ngx_http_modsecurity_module.so /etc/nginx/modules 

# Download the GeoIP database (you may want to check for the latest version)
RUN wget https://github.com/leev/ngx_http_geoip2_module/archive/3.2.tar.gz

RUN git clone --recursive https://github.com/maxmind/libmaxminddb
RUN cd libmaxminddb && \
  ./bootstrap && \
  ./configure && \
  make && \
  make install 

RUN tar -xvf 3.2.tar.gz

# add geoip module to nginx 
RUN cd nginx-1.16.1 && \
  ./configure --with-compat --add-dynamic-module=../ngx_http_geoip2_module-3.2 && \
  make modules && \
  cp objs/ngx_http_geoip2_module.so /etc/nginx/modules

# copy downloaded geoip database to nginx conf directory
RUN mkdir /etc/nginx/geoip
COPY ./geoip/city/GeoLite2-City.mmdb /etc/nginx/geoip/maxmind-city.mmdb
COPY ./geoip/country/GeoLite2-Country.mmdb /etc/nginx/geoip/maxmind-country.mmdb 

# Add config files
COPY ./conf/nginx.conf /etc/nginx/

RUN ln -sf /dev/stdout /var/log/modsec_audit.log
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]