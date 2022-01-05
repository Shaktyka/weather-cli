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

// Получить погоду:
const getForecast = async () => {
  const defaultCity = 'ufa'; // город по умолчанию
  try {
    const weather = await getWeather(defaultCity);
    // красиво вывести погоду
    console.log(weather);
  } catch (err) {
    if (err?.response?.status === 404) {
      printError('Неверно указан город');
    } else if (err?.response?.status === 401) {
      printError('Неверно указан токен');
    } else {
      printError(err.message);
    }
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
  getForecast();
};

initCLI();
