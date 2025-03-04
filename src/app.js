import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import AppError from './utils/appError.js';
import i18n from '../common/languages/index.js';
import globalErrorHandler from './utils/errorHandler.js';
import router from './routes/index.js';
import { setLanguage } from './middleware/i18nMiddleware.js';
import headerValidationMiddleware from './middleware/headerValidations.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.options('*', cors());

app.use(i18n.init);

app.use(setLanguage);

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'static')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

if (process.env.NODE_ENV === 'development') {
  const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customSiteTitle: process.env.SITE_TITLE,
      authorizeBtn: false,
      swaggerOptions: {
        filter: true,
        displayRequestDuration: true,
      },
    })
  );
}
app.use('/api', headerValidationMiddleware, router);

app.all('*', (_req, _res, next) => {
  next(new AppError(`API_FAILED`, 404));
});

app.use(globalErrorHandler);

export default app;
