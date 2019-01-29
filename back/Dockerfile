FROM hub.c.163.com/nce2/nodejs:0.12.2

# Create app directory
RUN mkdir -p /home/game
WORKDIR /home/game

# Bundle app source
COPY . /home/game
RUN npm install
EXPOSE 8000
EXPOSE 3000
CMD npm start > ./game_log.log