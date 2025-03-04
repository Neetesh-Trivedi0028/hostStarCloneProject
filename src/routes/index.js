import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = fs.readdirSync(__dirname);
console.info('=======================', routes);

routes.forEach((route) => {
  if (route === 'index.js') return;
  const routePath = path.join(__dirname, route, 'index.js'); //----------- Target index.js inside folders---------
  if (fs.existsSync(routePath)) {
    import(`./${route}/index.js`)
      .then((module) => {
        router.use(`/${route}`, module.default);
      })
      .catch((err) => {
        console.error(`Failed to load route ${route}:`, err);
      });
  }
});

export default router;
