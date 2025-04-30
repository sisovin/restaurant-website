import { Request, Response, NextFunction } from 'express';
import { validationResult, checkSchema } from 'express-validator';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

// Request validation middleware
export const validateRequest = (schema: any) => {
  return [
    checkSchema(schema),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

// Error handling middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};

// Rate limiting middleware
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// CORS configuration
export const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const corsMiddleware = cors(corsOptions);

// Swagger documentation setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.0',
      description: 'API documentation for the Restaurant project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./api/*.ts'],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
export const swaggerUiMiddleware = swaggerUi.setup(swaggerDocs);
