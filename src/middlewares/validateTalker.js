const validateName = (req, res, next) => {
  const { name } = req.body;
  const numberOfCharacters = 3;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < numberOfCharacters) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const minimumAge = 18;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < minimumAge) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
  };

const validateRate = (req, res, next) => {
  const {
    talk: { rate },
  } = req.body;
  if (rate === undefined || typeof rate !== 'number') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (![1, 2, 3, 4, 5].includes(rate)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const {
    talk: { watchedAt },
  } = req.body;

  const validDate = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!watchedAt) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!validDate.test(watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
    validateWatchedAt,
    validateAge,
    validateName,
    validateRate,
    validateTalk,
};