import * as jwt from 'jsonwebtoken';

const tokenSecret = 'In a real app, this would come from a config file';

const login = (req, res) => {
  const token = {
    sid: 'id',
  };
  const signedToken = jwt.sign(token, tokenSecret, { expiresIn: 86400 });
  res.status(200)
    .cookie('token', signedToken, { maxAge: 86400 })
    .send(/* ... */);
};

module.exports = login;
