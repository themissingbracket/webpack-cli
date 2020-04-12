import { LoggerFactory } from '../../Logger/LoggerFactory';
import getProjectPath from '../../Utils/getProjectPath';



const logger = LoggerFactory();

async function _createSourceFolder (projectPath:string):Promise<void> {
	const { default:fs } = await import('fs');
	const { default:path } =  await import('path');

	const srcPath = path.join(projectPath, 'src');
    
	fs.mkdirSync(srcPath);
	fs.writeFileSync(path.join(srcPath, 'index.tsx'),'');

}



export async function buildSourceFolder(projectName:string):Promise<void> {
	try {
		logger.debug('Creating source folder');
		const projectPath = await getProjectPath(projectName);
		await _createSourceFolder(projectPath);
	} catch (error) {
		logger.error('Could not create source folder');
		logger.error(error);
	}
}