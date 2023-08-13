import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

export default {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const { username, email } = req.body;
      const newUser: IUser = new User({ username, email });
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
