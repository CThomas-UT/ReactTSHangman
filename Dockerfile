FROM ubuntu:20.04

RUN apt-get update && apt-get install -y curl unzip

WORKDIR /app

RUN curl -LJO https://github.com/CThomas-UT/ReactTSHangman/archive/main.zip
RUN unzip ReactTSHangman-main.zip && mv ReactTSHangman-main/* . && rm -rf ReactTSHangman-main ReactTSHangman-main.zip

FROM node:16

WORKDIR /app/main

COPY package.json package-lock.json /app/main/

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
