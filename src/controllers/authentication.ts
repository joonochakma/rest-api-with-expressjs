import express from "express";
import { getUserByEmail, createUser } from "../db/users";
import { random, authentication } from "../helpers";
import { config } from "../config";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const salt = random();
        const sessionToken = authentication(salt, user.id.toString());
        user.authentication.sessionToken = sessionToken;
        
        await updateUserById(user.id, { authentication: { sessionToken } });

        res.cookie('JOONO-AUTH', sessionToken, {
            httpOnly: true,
            secure: config.isProduction,
            sameSite: config.isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        return res.status(200).json({ 
            user: { 
                id: user.id, 
                email: user.email, 
                username: user.username 
            } 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username required' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(201).json({ 
        user: { 
            id: user.id, 
            email: user.email, 
            username: user.username 
        } 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
    try {
        res.clearCookie('JOONO-AUTH', { path: '/' });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

import { updateUserById } from "../db/users";
