const fs = require('fs').promises;
const { join } = require('path');

const readFile = async () => {
  const path = './talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllList = async () => {
  const list = await readFile();
  return list;
};

const getById = async (id) => {
  const list = await readFile();
  const personFind = list.filter((e) => e.id === Number(id));
  try {
    return personFind;
  } catch (error) {
    return null;
  }
};

const newPerson = async (content) => {
  const path = './talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    const arr = JSON.parse(contentFile);
    await arr.push(content);
    await fs.writeFile(join(__dirname, path), JSON.stringify(arr));
  } catch (error) {
    return null;
  }
};

const updatePerson = async (id, update) => {
  try {
    const path = './talker.json';
    const arrFile = await readFile();
    const personToUpdate = arrFile.find((e) => e.id === id);
    if (personToUpdate) {
    const updated = arrFile.map((e) => {
          if (e.id === id) return { ...e, ...update };
          return e;
        });
      await fs.writeFile(join(__dirname, path), JSON.stringify(updated));
      return { id, ...update };
    }
    return false;
  } catch (error) {
    return null;
  }
};

const deletePerson = async (id) => {
  try {
    const path = './talker.json';
    const arrFile = await readFile();
    const personToDelete = arrFile.find((e) => e.id === id);
    if (personToDelete) {
    const updated = arrFile.filter((e) => (e.id !== id));
      console.log(updated);
      await fs.writeFile(join(__dirname, path), JSON.stringify(updated));
    }
    return false;
  } catch (error) {
    return null;
  }
};

const findPersonByName = async (query) => {
  try {
    const arrFile = await readFile();
    const finded = arrFile.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()));
    if (!query) {
      return arrFile;
    }
    return finded || [];
  } catch (error) {
    return null;
  }
};

module.exports = {
  getAllList,
  getById,
  newPerson,
  updatePerson,
  deletePerson,
  findPersonByName,
};
