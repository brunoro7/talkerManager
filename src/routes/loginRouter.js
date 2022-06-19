const { Router } = require('express');
const createToken = require('../helpers/tokenCreate');
const { checkLoginEmail, checkLoginPassword } = require('../midllewares/checkLoginHelpers');

const { HTTP_OK_STATUS } = require('../helpers/statusIndex');

const loginRouter = Router();

// Requisito 3
loginRouter.post('/', checkLoginEmail, checkLoginPassword, (_req, res) => {
  const token = createToken(); // aqui recebe e gera o token.
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = loginRouter;