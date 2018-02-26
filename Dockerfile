FROM nginx:1.12.1

MAINTAINER UMAM

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

# COPY CONF
COPY ./frontend-admin.conf /etc/nginx/conf.d/frontend-admin.conf

# COPY DIST to /usr/share/nginx/html/frontend-admin
COPY ./dist /usr/share/nginx/html/frontend-admin/

USER nobody
