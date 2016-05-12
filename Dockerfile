FROM node:4.4.4-slim

RUN mkdir -p /srv/app
WORKDIR /srv/app

ADD package.json /srv/app/
RUN npm install --production

ADD . /srv/app

RUN npm install && \
    npm run compile && \
    npm prune --production

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
