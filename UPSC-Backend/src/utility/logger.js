const winston = require('winston');
const { format, createLogger, transports } = require("winston");
const { combine, label, json ,timestamp, splat, printf} = format;
require("winston-daily-rotate-file");

//Label
const CATEGORY = "Log Rotation";

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/school_be-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});
// meta param is ensured by splat()
const myFormat = printf(({ timestamp, level, message, meta }) => {
  return `${timestamp}|${level}|${message}${meta? '|'+ JSON.stringify(meta) : ''}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
  format: combine(
    format.colorize(),
    timestamp({
    format: "MM-DD-YY HH:mm:ss",
  })
  ,myFormat
  ),
  transports: [fileRotateTransport, new transports.Console()],
});

module.exports = logger;