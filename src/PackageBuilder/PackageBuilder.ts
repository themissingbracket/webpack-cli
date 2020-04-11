import { buildPackageJson, IPackage } from './templates/package.json.template';
import { installDependecy } from './Dependency/installDependency';



function _projectExists(folder:string) :Promise<boolean> {
	return import('../Utils/projectFileExists')
		.then(({ default:projectFileExists }) => projectFileExists(folder));
}

function _getProjectPath(projectName:string) :Promise<string> {
	return import('../Utils/getProjectPath')
		.then(({default:getProjectPath}) => getProjectPath(projectName));
}

function _createFile(path:string, data:IPackage):Promise<void> {
	return import('fs')
		.then(({default:fs}) => {
			fs.writeFileSync(path, JSON.stringify(data, null, 2));
			return;
		});
}

function _getPackageJsonFile(projectName:string):Promise<string> {
	return import('path')
		.then(({default:path}) => {
			return path.join(process.cwd(),projectName,'package.json');
		});
}
export async function BuildPackageJson (projectName:string):Promise<void> {
	try {
		const projectPath = await _getProjectPath(projectName);
		
		if(! await _projectExists(projectPath)) throw new Error(`Could not find ${projectName}`);

		const pckg = await buildPackageJson(projectName);
		const packageFile =  await _getPackageJsonFile(projectName);
		_createFile(packageFile, pckg);
		await installDependecy(projectPath);
		return;

	} catch (error) {
		Promise.reject(error);
	}
}