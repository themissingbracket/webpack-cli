import { exec } from 'child_process';
import { LoggerFactory } from '../../Logger/LoggerFactory';

const devDependency:Array<string> = [
	'webpack',
	'webpack-cli',
	'webpack-dev-server',
	'typescript',
];


const dependency:Array<string>  = [];

const logger = LoggerFactory();


export async function installDependecy(folderName:string):Promise<void> {
	try {
		logger.debug('Installing Dev Dependency');
		await new Promise((resolve, reject) => {
			const pckg = devDependency.join(' ');
			exec(`npm i ${pckg} --save-dev --prefix ${folderName}`, (err) => err ? reject(err) :resolve());
		});

		// await Promise.all(devDependency.map(d => new Promise((resolve,reject) => exec(`npm i ${d} --save-dev --prefix ${folderName}`,(err) => err ? reject(err):resolve()))));
		logger.debug('Installing Dependencies');
		await new Promise((resolve, reject) => {
			const pckg = dependency.join(' ');
			exec(`npm i ${pckg} --save-dev --prefix ${folderName}`, (err) => err ? reject(err) : resolve());
		});
		// await Promise.all(dependency.map(d => new Promise((resolve, reject) => exec(`npm i ${d} --save-dev --prefix ${folderName}`, (err) => err ? reject(err) : resolve()))));

	} catch (error) {
		logger.error('Couldnot install all dependencies');
		logger.error(error);
	}
}