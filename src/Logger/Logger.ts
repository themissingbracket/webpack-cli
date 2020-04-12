import { ILogger } from './ILogger';
import chalk from 'chalk';

interface ILog {
    prefix:string;
    prefixFormat:chalk.ChalkFunction
    messageFormat:chalk.ChalkFunction
}
type LoggerType = 'DEBUG' | 'INFO' | 'SUCCESS' | 'ERROR'

const LOGGER_FUNCTION:Record<LoggerType, ILog> = {
	DEBUG:{
		prefix:'[ Debug ]',
		prefixFormat:chalk.bold.cyan,
		messageFormat:chalk.bold
	},
	INFO: {
		prefix: '[ Info ]',
		prefixFormat: chalk.bold.blue,
		messageFormat: chalk.bold
	},
	SUCCESS: {
		prefix: '[ Success ]',
		prefixFormat: chalk.bold.green,
		messageFormat: chalk.bold
	},
	ERROR: {
		prefix: '[ Error ]',
		prefixFormat: chalk.bold.red,
		messageFormat: chalk.bold
	},
};

export class Logger implements ILogger {
	debug(message: string): void {
		this._log(message, LOGGER_FUNCTION.DEBUG);
	}
	info(message: string): void {
		this._log(message, LOGGER_FUNCTION.INFO);
	}
	success(message: string): void {
		this._log(message, LOGGER_FUNCTION.SUCCESS);
	}
	error(message: string): void {
		this._log(message, LOGGER_FUNCTION.ERROR);
	}
    
	private _log(message:string, log:ILog) {
		console.log(`${log.prefixFormat(log.prefix)} ${log.messageFormat(message)}`);
	}
    
}