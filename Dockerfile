FROM node:14

WORKDIR /usr/src/app

RUN git clone https://github.com/CThomas-UT/ReactTSHangman.git .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]