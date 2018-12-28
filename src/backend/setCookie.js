const setCookie = (req, res) => {
  const { cookie } = req.headers;

  if (cookie === undefined) {
    res.cookie('userCookie', 'hashGoesHere?', {
      maxAge: 900000,
      httpOnly: true,
    });
  }
};

module.exports = setCookie;
