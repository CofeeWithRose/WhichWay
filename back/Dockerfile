FROM docker.io/node

# Create app directory
RUN mkdir -p /home/game
WORKDIR /home/game

# Bundle app source
COPY . /home/game
RUN npm install
EXPOSE 8000
EXPOSE 3000
CMD npm run serve > ./game_log.log