FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app/client
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm run build
EXPOSE 8080
USER node
CMD ["npm", "start"]
