FROM node:latest
WORKDIR /app/data
COPY /app /
RUN yarn build
EXPOSE 80
EXPOSE 443
CMD [ "yarn", "start" ]