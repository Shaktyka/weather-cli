#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const defaultCity = 'moscow'; // город по умолчанию

// Сохранение города:
const saveCity = async (city) => {
  if (!city.length) {
    printError('Не передано название города');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('Город сохранён');
  } catch (err) {
    printError(err.message);
  }
};

// Сохранение токена:
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

// Получение погоды:
const getForecast = async () => {
  try {
    let city = await getKeyValue(TOKEN_DICTIONARY.city);
    if (!city) {
      city = defaultCity;
    }
    const weather = await getWeather(city);
    // красиво выводит погоду:
    printWeather(weather, getIcon(weather.weather[0].icon));

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

// Функция-роутер - обрабатывает на запросы в консоли:
const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    // Выводит help:
    return printHelp();
  }
  if (args.s) {
    // Сохраняет город:
    return saveCity(args.s);
  }
  if (args.t) {
    // Сохраняет токен:
    return saveToken(args.t);
  }
  // Показывает погоду по умолчанию:
  return getForecast();
};

initCLI();
