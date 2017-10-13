FROM node:latest

# File Author / Maintainer
MAINTAINER sGeeK

RUN mkdir -p /usr/app/front/
WORKDIR /usr/app/front/
ADD package.json package.json
RUN npm install

CMD ["npm", "start"]