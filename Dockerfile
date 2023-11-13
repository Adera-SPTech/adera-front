FROM node:latest
COPY ../adera-front/ /
RUN npm i
RUN npm install nodemon
ENTRYPOINT ["npm","run","dev"]

EXPOSE 3333
