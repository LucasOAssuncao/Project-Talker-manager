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

module.exports = {
    getAllList,
    getById,
};