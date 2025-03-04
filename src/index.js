import http from 'http';
import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import 'dotenv/config';

process.on('uncaughtException', (err) => {
  console.info('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.info(err.name, err.message);
  process.exit(1);
});

import app from './app.js';

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info('Connected to MongoDB');
  });

mongoose.set('debug', process.env.NODE_ENV === 'development');

let server;
if (process.env.NODE_ENV === 'production') {
  server = https.createServer(
    {
      key: fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8'),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8'),
      ca: fs.readFileSync(process.env.SSL_CA_PATH, 'utf8'),
    },
    app
  );
} else {
  server = http.createServer(app);
}

const port = process.env.PORT;

server.listen(port, () => {
  console.info(`server is running on http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.info('UNHANDLED REJECTION! 💥 Shutting down...');
  console.info(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.info('💥 Process terminated!');
  });
});
