import { promises } from 'fs';
import { homedir } from 'os';
import { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } from 'path';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city'
};

// Проверяет, существует ли файл:
const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (err) {
    return false;
  }
};

// Сохраняет в файле пару ключ: значение:
const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
};

// Читает из файла значение по ключу:
const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY};
