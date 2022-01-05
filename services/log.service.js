import chalk from 'chalk';
import dedent from 'dedent-js';

// Выводит сообщение об ошибке:
const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

// Выводит сообщение об успехе:
const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

// Выводит справку:
const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(' HELP ')}
      Без параметров  вывод погоды
      -s [city]       для установки города
      -h              для вывода помощи
      -t [API_KEY]    для сохранения токена`)
  );
};

// Выводит погоду:
const printWeather = (data, icon) => {
  console.log(
    dedent(`${chalk.bgMagenta(' WEATHER ')}
      Погода в городе ${data.name}
      ${icon} ${data.weather[0].description}
      Температура:    ${data.main.temp}
      Ощущается как:  ${data.main.feels_like}
      Влажность:      ${data.main.humidity}%
      Скорость ветра: ${data.wind.speed}м/с
    `)
  );
};

export { printError, printSuccess, printHelp, printWeather };
