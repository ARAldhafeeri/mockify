
import { Request, Response, NextFunction, Express } from 'express';


const headersSetting = (req: Request, res: Response, next: NextFunction): void  => {
  // Set the X-XSS-Protection header to prevent reflected XSS attacks
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Set the X-Content-Type-Options header to prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  next();
}

const applyServerHardening = (app: Express): void => {
  app.disable('x-powered-by');
  // Make your Express app use your custom middleware:
  app.use(headersSetting);
}

export default applyServerHardening;