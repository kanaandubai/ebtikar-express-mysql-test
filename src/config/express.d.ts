// src/express.d.ts

import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any; // Replace 'any' with the actual type of the user data
  }
}
