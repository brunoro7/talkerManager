const { HTTP_FAIL } = require('../helpers/statusIndex');

// Requisito 4 - parte 1
const checkLoginEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const validEmail = /^[^@]+@[^@]+\.[^@]+$/i.test(email);

    if (!email) throw new Error('O campo "email" é obrigatório');
    if (!validEmail) throw new Error('O "email" deve ter o formato "email@email.com"');

    next();
  } catch (error) {
    res.status(HTTP_FAIL).json({ message: error.message });
  }
};

// Requisito 4 - parte 2
const checkLoginPassword = (req, res, next) => {
  try {
    const { password } = req.body;
    const NUM_SIX = 6;

    if (!password) throw new Error('O campo "password" é obrigatório');
    if (JSON.stringify(password).length < NUM_SIX) {
      throw new Error('O "password" deve ter pelo menos 6 caracteres');
    }

    next();
  } catch (error) {
    res.status(HTTP_FAIL).json({ message: error.message });
  }
};

module.exports = { checkLoginEmail, checkLoginPassword };