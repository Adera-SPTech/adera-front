FROM node:latest
COPY ./ /
RUN npm i
RUN npm install nodemon
ENTRYPOINT ["npm","run","dev"]

EXPOSE 3333
