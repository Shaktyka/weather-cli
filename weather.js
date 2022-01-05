#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
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
    saveKeyValue('city', args.s);
  }
  if (args.t) {
    // сохранить токен
    return saveToken(args.t);
  }
  // вывести погоду
};

initCLI();
