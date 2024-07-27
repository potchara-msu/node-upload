FROM node
WORKDIR /app
COPY . .
RUN npm install express multer
EXPOSE 3000
CMD ["node","server.js"]


