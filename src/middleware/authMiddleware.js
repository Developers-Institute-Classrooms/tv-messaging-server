import jwt from 'jsonwebtoken';

// JWT Secret
const SECRET = '2020sucked';

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: 'Authorization header required!' });
    }

    // check the authorization string is in the correct bearer scheme
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid Bearer string!' });
    }

    // split the token from the Bearer string
    const encodedToken = authorization.split(' ')[1];

    const payload = jwt.verify(encodedToken, SECRET);
    console.log('payload', payload);

    // check the property of the token - check for authenticated property
    if (!payload.authenticated || !payload.sub) {
      return res.status(401).json({ error: 'Not authenticated!' });
    }

    req.payload = payload;

    next();
  } catch (e) {
    console.error(e.name);

    if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid JWT!' });
    }

    return res.status(500).send(e);
  }
};

export default authMiddleware;
