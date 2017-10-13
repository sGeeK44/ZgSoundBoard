# Set nginx base image
FROM nginx

# File Author / Maintainer
MAINTAINER sGeeK

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf
COPY zgsoundboard.com /etc/nginx/sites-enabled/zgsoundboard.com
COPY api.zgsoundboard.com /etc/nginx/sites-enabled/api.zgsoundboard.com