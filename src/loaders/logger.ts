import * as winston from "winston";

export class Logger{

    public static getInstance():Logger{
        if(Logger.instance === null){
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private static instance:Logger|null = null;
    public logger:any;

    public transports: any = {
        logs: new winston.transports.File({
            filename: "./logs/logs.log",
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss'
                }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.simple(),
                winston.format.json()),
        }),

        console: new winston.transports.Console({
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.simple()),
        }),

    };
    private constructor() {
        this.logger = winston.createLogger({
                levels:winston.config.npm.levels,
                transports:[
                    this.transports.logs,
                    this.transports.console
                ]
            }
        )
    }

    public info(msg:string){
        this.logger.info(msg);
    }
    public error(msg:string){
        this.logger.error(msg);
    }
    public warn(msg:string){
        this.logger.warn(msg);
    }
    public debug(msg:string){
        this.logger.debug(msg);
    }
    public silly(msg:string){
        this.logger.silly(msg);
    }
}

