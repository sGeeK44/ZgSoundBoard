FROM node:latest

# File Author / Maintainer
MAINTAINER sGeeK

RUN mkdir -p /usr/app/back/
RUN mkdir -p /usr/app/business/
WORKDIR /usr/app/back/
ADD package.json package.json
RUN npm install

CMD ["npm", "start"]