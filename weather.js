#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранён');
  } catch (err) {
    printError(err.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    // вывести help
    printHelp();
  }
  if (args.s) {
    // сохранить город
    saveKeyValue(TOKEN_DICTIONARY.city, args.s);
  }
  if (args.t) {
    // сохранить токен
    return saveToken(args.t);
  }
  // вывести погоду по умолчанию:
  getWeather('ufa');
};

initCLI();
