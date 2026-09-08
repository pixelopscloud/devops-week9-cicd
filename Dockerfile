FROM node:18-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json .
RUN npm install --production

# Copy application source code
COPY app.js .

EXPOSE 3500

CMD ["node", "app.js"]
