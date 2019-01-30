FROM docker.io/node

# Create app directory
RUN mkdir -p /home/game
WORKDIR /home/game

# Bundle app source
COPY . /home/game
RUN npm install
RUN npm i typescript
EXPOSE 8000
EXPOSE 3000
CMD npm run start > ./game_log.log