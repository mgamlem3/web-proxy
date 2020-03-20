FROM node:latest
WORKDIR /app/data
COPY /app /
EXPOSE 80
RUN yarn build
CMD [ "yarn", "start" ]