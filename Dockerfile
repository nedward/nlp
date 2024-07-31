## Doing a multi-part build starting with the installation 
## of the dependancies.
FROM node:12-alpine AS builder

WORKDIR /app

COPY . .

# Only install the non-development dependancies

RUN rm -Rf node_modules

RUN  yarn install --production

## Now we build the image
FROM mhart/alpine-node:slim-12

RUN apk add shadow

RUN useradd -ms /bin/bash node

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# Create app directory
WORKDIR /home/node/app

USER node

## We copy the contents of the app directory from the previous build.

COPY --from=builder --chown=node:node /app .

EXPOSE 3000

CMD [ "node", "index.js" ]
