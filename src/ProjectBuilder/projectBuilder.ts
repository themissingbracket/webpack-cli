import { buildSourceFolder } from './SourceBuilder/BuildSourceFolder';

import { executeWorkflow } from '../Utils/executeWorkFlow';
import { validateProjectWorkflow } from './1ValidateProjectWorkflow/validateProjectWorkflow';
import { createProjectFolderWorkflow } from './2CreateProjectFolderWorkflow/createProjectFolderWorkflow';
import { LoggerFactory } from '../Logger/LoggerFactory';
import { createSrcFolder } from './3CreateSrcDirectoryWorkflow/createSrcDirectoryWorkflow';
import { setUpDepenciesWorkflow } from './6InstallDependencyWorkflow/installDependencyWorkflow';

const Workflow:Array<(projectName:string)=>Promise<void>> = [
	// Validate Project Name
	validateProjectWorkflow,
	// Create Project  Root Directory
	createProjectFolderWorkflow,
	// Install Dependency
	setUpDepenciesWorkflow,
	// Create Create Project SRC Directory
	createSrcFolder,
	// Create Webpack Config
	// Create Jest Config
];

export const buildProject = (folderName:string):Promise<void> => {
	const logger = LoggerFactory();
	logger.debug(`Building ${folderName}...`);
	return executeWorkflow(Workflow, folderName)
		.then(() => logger.success(`${folderName} created`))
		.catch(err => {
			logger.error(`Couldnot create ${folderName}`);
			logger.error(err);
		})
	;
};
