const { Router } = require('express');

const authMiddleware = require('../midllewares/authMiddleware'); // para verificar a autenticação no header;
const { checkNewTalkerName, checkNewTalkerAge,
  checkTalk, checkRate, checkWatchedAs } = require('../midllewares/checkBodyHelpers');
  
const { HTTP_OK_STATUS, HTTP_OK_POSTED, HTTP_OK_DELETED,
  HTTP_OK_FAIL } = require('../helpers/statusIndex');

const readFile = require('../midllewares/readFile');
const writeFile = require('../midllewares/writeFile');

const talkerRouter = Router();

// Console das requisições, serve para acompanhar em desenvolvimento;
talkerRouter.use((req, _res, next) => {
  console.log('req.method:', req.method);
  console.log('req.path:', req.path);
  console.log('req.params:', req.params);
  console.log('req.query:', req.query);
  console.log('req.headers:', req.headers);
  console.log('req.body:', req.body);
  next();
});

// Requisito 8
  talkerRouter.get('/search', authMiddleware, async (req, res) => {
  const dataTalker = await readFile();
  const searchTerm = Object.values(req.query);
  const filteredRecipes = dataTalker.filter((talker) => talker.name.includes(searchTerm));
  console.log(searchTerm);
  
  if (!searchTerm || searchTerm === null) {
    return res.status(HTTP_OK_STATUS).json(dataTalker);
  }

  res.status(HTTP_OK_STATUS).json(filteredRecipes);
});

// Requisito 7
talkerRouter.delete('/:id', authMiddleware,
  async (req, res) => {
    const dataTalker = await readFile();
    const id = Number(req.params.id);

    const index = dataTalker.findIndex((talker) => talker.id === id);

    dataTalker.splice(index, 1);

    await writeFile(dataTalker);
    res.status(HTTP_OK_DELETED).json();
});

// Requisito 6
talkerRouter.put('/:id', authMiddleware, checkNewTalkerName,
  checkNewTalkerAge, checkTalk, checkRate, checkWatchedAs, 
  async (req, res) => {
    const dataTalker = await readFile();
    const id = Number(req.params.id);

    const index = dataTalker.findIndex((talker) => talker.id === id);

    dataTalker[index] = { ...dataTalker[index], ...req.body, id };

    await writeFile(dataTalker);
    res.status(HTTP_OK_STATUS).json(dataTalker[index]);
});

// Requisito 2
talkerRouter.get('/:id', async (req, res) => {
  const dataTalker = await readFile();
  const { id } = req.params; // o params nesse caso, é similar ao match.params do front end.
  
  const filterByTalkerId = dataTalker.find((talker) => talker.id === Number(id));
  
  if (!filterByTalkerId) {
    return res.status(HTTP_OK_FAIL).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(filterByTalkerId);
});

// Requisito 1
talkerRouter.get('/', async (_req, res) => {
  const dataTalker = await readFile();
  
  if (dataTalker.length !== 0) return res.status(HTTP_OK_STATUS).json(dataTalker);
  if (dataTalker.length === 0) return res.status(HTTP_OK_STATUS).json([]);
});

// Requisito 5
talkerRouter.post('/', authMiddleware, checkNewTalkerName,
  checkNewTalkerAge, checkTalk, checkRate, checkWatchedAs, 
  async (req, res) => {
    const dataTalker = await readFile();
    const id = dataTalker.length + 1;
    const { name, age, talk } = req.body;
    
    dataTalker.push({ name, age, id, talk: { ...talk } });
    await writeFile(dataTalker);
    res.status(HTTP_OK_POSTED).json({ name, age, id, talk: { ...talk } });
});

module.exports = talkerRouter;
