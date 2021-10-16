FROM node:14

WORKDIR /styletribute-app
RUN mkdir -p uploads
COPY package.json .
RUN npm install
COPY . .
CMD npm start