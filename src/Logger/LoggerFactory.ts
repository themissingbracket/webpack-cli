import { ILogger } from './ILogger';
import { Logger } from './Logger';
export const LoggerFactory = ():ILogger => {
	return new Logger();
};