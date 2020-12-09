import express from 'express';
import argon2 from 'argon2';

const authRouter = (User) => {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    try {
      console.log('register');
      console.log(req.body);

      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required!' });
      }

      const usernameLower = username.toLowerCase();
      console.log(usernameLower);

      // Check the user doesn't exist
      const existingUser = await User.findOne({ usernameLower });
      console.log(existingUser);

      if (existingUser !== null) { // TODO - Test this!!
        return res.status(400).json({ error: 'Username already in use!' });
      }

      // Hash password
      const hashedPassword = await argon2.hash(password);

      // Store new user in the database
      const newUser = new User({
        username,
        usernameLower,
        password: hashedPassword
      });
      console.log(newUser);

      const savedUser = await newUser.save();
      console.log('savedUser', savedUser);
      
      return res.status(201).json(savedUser);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  router.post('/login', (req, res) => {
    console.log('login');
    return res.end();
  });

  return router;
};

export default authRouter;
