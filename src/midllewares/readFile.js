const fs = require('fs').promises; // modulo para trabalhar com async, ajuda do Mr.Junior(Turma-Xp) p/ entender o que foi pedido.

const readFile = async () => {
  const readFileTalker = await fs.readFile('./talker.json');
  return JSON.parse(readFileTalker);
};

module.exports = readFile;