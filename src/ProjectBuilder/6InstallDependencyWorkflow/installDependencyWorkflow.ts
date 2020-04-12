import getProjectPath from '../../Utils/getProjectPath';
import fs from 'fs';
import path from 'path';
import { LoggerFactory } from '../../Logger/LoggerFactory';
import { exec } from 'child_process';
import { executeWorkflow } from '../../Utils/executeWorkFlow';


type IDependency = Record<string, string>

export interface IPackage {
    name: string,
    version: string,
    description: string,
    author: string,
    license: string,
    devDependencies: IDependency,
    dependencies: IDependency
}

const PACKAGE_TEMPLATE: IPackage = {
	name: '',
	version: '0.0.1',
	description: '',
	author: '',
	license: 'MIT',
	devDependencies: {},
	dependencies: {}
};

const dependencies:Array<string> = [
	'react',
	'react-dom',
	'react-router-dom'
];

const devDependencies:Array<string> = [
	'webpack',
	'webpack-cli',
	'webpack-dev-server',
	'typescript',
];

const logger = LoggerFactory();

function _installDependencies(dependencyList:Array<string>, projectPath:string, isDev:boolean = false):Promise<void> {
	return new Promise((resolve, reject) => {   
		exec(`npm i ${dependencyList.join(' ')} --prefix=${projectPath} ${isDev?'':'--save-dev'}`, (err) => err? reject(err) : resolve());
	});
}

async function installDependencyWorkflow (projectName:string):Promise<void> {
	const projectPath = getProjectPath(projectName);
	logger.debug('Installing Dev Dependencies');
	await _installDependencies(devDependencies, projectPath, true);
	logger.debug('Installing Dependencies');
	await _installDependencies(dependencies, projectPath);
}

async function createPackageJSON(projectName:string):Promise<void> {
	const projectPath = getProjectPath(projectName);
	const pckg = { ...PACKAGE_TEMPLATE };
	pckg.name = projectName.toLowerCase();
	const pckgPath = path.join(projectPath, 'package.json');
	fs.writeFileSync(pckgPath, JSON.stringify(pckg, null, 2));
    
}

const workflows:Array<(projectName:string) => Promise<void>> = [
	createPackageJSON,
	installDependencyWorkflow
];

export const setUpDepenciesWorkflow = (projectName:string):Promise<void> => {
	logger.debug(`Setting up dependencies for ${projectName}`);
	return executeWorkflow(workflows, projectName)
		.then(() => {
			logger.success(`Dependecies set up for ${projectName}`);
		}).catch(err => {
			logger.error('Could not set up dependencies');
			logger.error(err);
		});
};