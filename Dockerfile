FROM node:14

WORKDIR /tv-messaging-server

COPY . /tv-messaging-server

# /tv-messaging-server should have all the files from the project folder

RUN yarn install

EXPOSE 5000

CMD ["yarn", "start"]
