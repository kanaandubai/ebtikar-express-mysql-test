// src/config/constants.ts
export const SECRET_KEY = 'EBTIKAR';
declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace 'any' with the actual type of the user data
    }
  }
}