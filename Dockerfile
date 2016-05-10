FROM node:4.4.4

RUN mkdir -p /srv/app
WORKDIR /srv/app

ADD package.json /srv/app/
RUN npm install

ADD . /srv/app

RUN npm run compile

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
