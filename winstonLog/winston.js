import appRoot from 'app-root-path';
import winston from 'winston';
import 'winston-daily-rotate-file';

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

// instantiate a new Winston Logger with the settings defined above
const myLogger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSS"
        }),
        winston.format.printf(info => `${info.timestamp} [${info.label === undefined ? "" : info.label}${info.funName === undefined ? "" : "-" + info.funName}] [${info.level}]: ${info.message}`)
    ),
    transports: [
        //new winston.transports.File(options.file),
        new winston.transports.DailyRotateFile({
            name: 'file',
            //datePattern: '.yyyy-MM-dd',
            filename: `${appRoot}/logs/app.log`// path.join(__dirname, 'logs', 'log_file.log')
        }),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
myLogger.stream = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

export default myLogger;
