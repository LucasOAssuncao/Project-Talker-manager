const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker');

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