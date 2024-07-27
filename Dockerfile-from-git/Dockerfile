FROM node
WORKDIR /app
RUN git clone https://github.com/potchara-msu/node-upload.git .
COPY . .
RUN npm install express multer
EXPOSE 3000
CMD ["node","server.js"]