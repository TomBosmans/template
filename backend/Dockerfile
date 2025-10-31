FROM node:24-alpine
WORKDIR /backend
EXPOSE 3000
RUN apk add --no-cache postgresql-client
RUN npm install -g npm@latest
CMD ["npm", "run", "dev"]
