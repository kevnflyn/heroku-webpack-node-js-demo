FROM node:fermium-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json package-lock.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 4000

CMD npm run build && npm run start:prod
