export interface ILogger {
    debug(message:string):void
    info(message: string): void
    success(message: string): void
    error(message: string): void
}