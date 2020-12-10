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

  router.post('/login', async (req, res) => {
    try {
      console.log('login');
      console.log(req.body);

      const { username, password } = req.body;

      // validate request body properties
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required!' });
      }
  
      // lookup the user by usernameLower property
      const usernameLower = username.toLowerCase();
      console.log(usernameLower);

      // Check the user doesn't exist
      const existingUser = await User.findOne({ usernameLower });
      console.log(existingUser);
  
      // if the user doesn't exist return a 404 error
      if (existingUser === null) {
        return res.status(404).json({ error: 'Username not found!' });
      }
  
      // compare password from the database with recieved password (argon2 verify)
      if (!await argon2.verify(existingUser.password, password)) {
        // if passwords don't match throw an error
        return res.status(401).json({ error: 'Passwords do not match!' });
      }

      // generate auth token - encode with base64 encoding
      const token = JSON.stringify({
        authenticated: true,
        userId: existingUser._id
      });
      console.log(token);

      const encodedToken = Buffer.from(token).toString('base64');
      console.log(encodedToken);
  
      // send token back to the client
      return res.status(200).json({ token: encodedToken });
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  return router;
};

export default authRouter;
