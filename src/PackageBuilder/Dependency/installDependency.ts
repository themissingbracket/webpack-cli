import { exec } from 'child_process';

const devDependency:Array<string> = [
	'webpack',
	'webpack-cli',
	'webpack-dev-server',
	'typescript',
];


const dependency:Array<string>  = [];



export async function installDependecy(folderName:string):Promise<void> {
	try {
        console.log('Installing Dev Dependency');
        await Promise.all(devDependency.map(d => new Promise((resolve,reject) => exec(`npm i ${d} --save-dev --prefix ${folderName}`,(err) => err ? reject(err):resolve()))));
        console.log('Installing Dependencies');
		await Promise.all(dependency.map(d => new Promise((resolve, reject) => exec(`npm i ${d} --save-dev --prefix ${folderName}`, (err) => err ? reject(err) : resolve()))));

	} catch (error) {
		console.error('Couldnot install all dependencies');
		console.error(error);
	}
}