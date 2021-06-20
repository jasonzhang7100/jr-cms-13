const { validateToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    // 204 No content
    // {error: "msg"}
    return res.sendStatus(401);
  }

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzQ3Y2M5ZWRjYmY0NWRhOGU3YjY5MCIsImlhdCI6MTYyMzQ5MDM3NCwiZXhwIjoxNjIzNTc2Nzc0fQ.k08JHgYxHyBPzhL1i9Xqfbss1RSxiM1MV9ny_gqpeQ0
  const contentArray = authHeader.split(' ');
  if (contentArray.length !== 2 || contentArray[0] !== 'Bearer') {
    return res.sendStatus(401);
  }

  const decoded = validateToken(contentArray[1]);
  if (!decoded) {
    return res.sendStatus(401);
  }
  req.user = decoded;
  next();
};
