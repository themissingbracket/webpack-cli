import getProjectPath from '../../Utils/getProjectPath';
import projectPathExists from '../../Utils/projectFileExists';



function _createProjectFolder(folderPath: string): Promise<void> {
	return import('fs')
		.then(({ default: fs }) => fs.mkdirSync(folderPath));
}

export const createProjectFolderWorkflow = async (projectName:string):Promise<void> => {
	const folderPath = getProjectPath(projectName);
	if (projectPathExists(folderPath)) return Promise.reject(`${projectName} already exists`);
	await _createProjectFolder(folderPath);

};