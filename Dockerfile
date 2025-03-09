FROM node:20.18-alpine AS package

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile

USER node

FROM node:20.18-alpine AS build

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY --chown=node:node --from=package /usr/src/app/package.json ./
COPY --chown=node:node --from=package /usr/src/app/yarn.lock ./
COPY --chown=node:node --from=package /usr/src/app/node_modules ./node_modules

COPY --chown=node:node /prisma ./prisma

RUN yarn prisma generate

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV=production

RUN yarn install --production --frozen-lockfile

RUN yarn cache clean

USER node

FROM node:20.18-alpine AS production

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

USER node

CMD ["sh", "-c", "yarn prisma migrate deploy && node dist/prisma/seed.js && node dist/src/main"]
