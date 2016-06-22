FROM nginx

MAINTAINER Eugene Poddubny<eugene.poddubny@gmail.com>

COPY app /home/frontend/app
COPY resources /home/frontend/resources
COPY index.html /home/frontend/index.html
COPY nginx.conf /etc/nginx/nginx.conf