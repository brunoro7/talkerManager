const { HTTP_FAIL_NOTAUTH } = require('../helpers/statusIndex');

const authMiddleware = (req, res, next) => {
  const NUM_SIXTEEN = 16;

  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error('Token não encontrado');
    if (authorization.length !== NUM_SIXTEEN) throw new Error('Token inválido');

    next();
  } catch (error) {
    res.status(HTTP_FAIL_NOTAUTH).json({ message: error.message });
  }
};

module.exports = authMiddleware;