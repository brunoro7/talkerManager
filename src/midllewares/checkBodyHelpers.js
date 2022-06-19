const { HTTP_FAIL } = require('../helpers/statusIndex');

const checkNewTalkerName = (req, res, next) => {
  try {
    if (!req.body.name) throw new Error('O campo "name" é obrigatório');
    if (req.body.name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');

  next();
  } catch (error) {
    res.status(HTTP_FAIL).json({ message: error.message });
  }
};

const checkNewTalkerAge = (req, res, next) => {
  try {
    if (!req.body.age) throw new Error('O campo "age" é obrigatório');
    if (req.body.age < 18) throw new Error('A pessoa palestrante deve ser maior de idade');

  next();
  } catch (error) {
    res.status(HTTP_FAIL).json({ message: error.message });
  }
};

const checkTalk = (req, res, next) => {
  try {
    const { talk } = req.body;
    if (!talk) throw new Error('O campo "talk" é obrigatório');
  next();
  } catch (error) {
    res.status(HTTP_FAIL).json({ message: error.message });
  }
};

const checkRate = (req, res, next) => {
  try {
    const { talk: { rate } } = req.body;
    if (rate < 1 || rate > 5) {
      throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
    }
    if (!rate) throw new Error('O campo "rate" é obrigatório');

  next();
  } catch (error) {
    res.status(HTTP_FAIL).json({ message: error.message });
  }
};

const checkWatchedAs = (req, res, next) => {  
  try {
    const { talk: { watchedAt } } = req.body;
  
    // REGEX usado como ref: https://pt.stackoverflow.com/questions/371316/valida%C3%A7%C3%A3o-regex-de-data-com-2-2-4-caracteres
    const validwatchedAt = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(watchedAt);
    if (!watchedAt) throw new Error('O campo "watchedAt" é obrigatório');
    if (!validwatchedAt) throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');

  next();
  } catch (error) {
    res.status(HTTP_FAIL).json({ message: error.message });
  }
};

module.exports = { checkNewTalkerName, checkNewTalkerAge, checkTalk, checkRate, checkWatchedAs };
