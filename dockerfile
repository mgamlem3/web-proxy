FROM node:latest
WORKDIR /app/data
COPY /app /
RUN yarn build
CMD [ "yarn", "start" ]