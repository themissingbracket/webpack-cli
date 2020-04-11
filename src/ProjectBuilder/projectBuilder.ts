
interface FileSystemModule{
    existsSync(path:string):boolean
    mkdirSync(path: string, options?: {}): string
}

interface PathModule {
    resolve(...pathSegements:Array<string>):string
}

function _getProjectPath(folderName:string):Promise<string> {
	return import('path')
		.then(({default:Path}) => {
			return Path.join(process.cwd(), folderName);
		});
}

function _projectPathExists (folderPath:string):Promise<boolean> {
	return import('../Utils/projectFileExists')
		.then(({ default: projectFileExists }) => projectFileExists(folderPath));
}

function _createProjectFolder(folderPath:string):Promise<void> {
	return import('fs')
		.then(({default:fs}) => fs.mkdirSync(folderPath));
}

export async function makeProjectFolder(folderName:string):Promise<void> {
	try {
		const folderPath = await _getProjectPath(folderName);
		if (await _projectPathExists(folderPath)) throw new Error(`${folderName} already exists`);
		await _createProjectFolder(folderPath);
		return Promise.resolve();
		
	} catch (error) {
		Promise.reject(error);
	}
}



