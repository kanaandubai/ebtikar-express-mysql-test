import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { SECRET_KEY } from '../config/constatnts';



export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser)  return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty())  return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findOne({ where: { username } });
    if (!user)  return res.status(401).json({ message: 'User with this UserName Not Found!' });
  
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return res.status(401).json({ message: 'Invalid Credentials' });
    
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '365d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error authenticating user' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ profile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user profile' });
  }
};