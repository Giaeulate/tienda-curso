FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY packages ./packages
ENV PORT=3000
EXPOSE 3000
CMD ["node", "packages/api/servidor.js"]
