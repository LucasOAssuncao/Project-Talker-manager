const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker');
const generateToken = require('./utils/generateToken');
const validateToken = require('./middlewares/validateToken');
const { validateWatchedAt,
  validateAge,
  validateName,
  validateRate,
  validateTalk } = require('./middlewares/validateTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const list = await talker.getAllList();
  res.status(200).json(list);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const person = await talker.getById(id);
  if (person.length === 0) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
 return res.status(200).json(person[0]);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const correctEmail = /\S+@\w+.\w+/i;
  const numberOfCharacters = 6;
  if ([email].includes(undefined)) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if ([password].includes(undefined)) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!correctEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < numberOfCharacters) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = generateToken();

  return res.status(200).json({ token });
});

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const path = './talker.json';
    const contentFile = JSON.parse(await fs.readFile(path));
    talker.newPerson({ id: Number(contentFile.length),
      ...req.body });
    res.status(201).json({ id: Number(contentFile.length),
      ...req.body });
  },
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const updatedPerson = await talker.updatePerson(Number(id), req.body);
    if (updatedPerson) {
      return res.status(200).json(updatedPerson);
    }
  },
);

app.delete(
  '/talker/:id',
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    await talker.deletePerson(Number(id));
    return res.status(204).json();
  },
);