const fs = require('fs').promises; // modulo para trabalhar com async, ajuda do Mr.Junior(Turma-Xp) p/ entender o que foi pedido.

const writeFile = async (content) => {
  const dataFile = JSON.stringify(content);
  await fs.writeFile('./talker.json', dataFile, 'utf-8');
};

module.exports = writeFile;