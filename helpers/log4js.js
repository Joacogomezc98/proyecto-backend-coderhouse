import log4js from 'log4js'

// CONFIGURACION PARA LOGS
log4js.configure({
    appenders: {
        // defino dos soportes de salida de datos
        consola: { type: "console" },
        archivo: { type: "file", filename: "error.log" },
        archivo2: { type: 'file', filename: 'warn.log' },
        // defino sus niveles de logueo
        loggerConsola: {
            type: "logLevelFilter",
            appender: "consola",
            level: "info",
        },
        loggerArchivo: {
            type: "logLevelFilter",
            appender: "archivo",
            level: "error",
        },
        loggerArchivo2: {
            type: 'logLevelFilter',
            appender: 'archivo2',
            level: 'warn'
        }
    },
    categories: {
        default: {
            appenders: ["loggerConsola"],
            level: "all",
        },
        file: {
            appenders: ["loggerArchivo", 'loggerArchivo2'],
            level: "all",
        },
    },
});


export const logger = log4js.getLogger();
export const loggerFile = log4js.getLogger("file");