
import Path from 'path';
import fs from 'fs';
import getProjectPath from '../../Utils/getProjectPath';
import { executeWorkflow } from '../../Utils/executeWorkFlow';
import { LoggerFactory } from '../../Logger/LoggerFactory';

const indextsxReactTemplate = `

    import React from 'react';

    const Root = () => {
        return (
            <div>
                
            </div>
        );
    }

    export default Root;
`;

const SRCFOLDER = 'src';


async function _buildIndexPage (projectPath:string):Promise<void> {
	const indexPath = Path.join(projectPath,SRCFOLDER, 'index.tsx');
	fs.writeFileSync(indexPath, indextsxReactTemplate);
}

async function _buildSrcFolder (projectPath:string):Promise<void> {
	const srcPath = Path.join(projectPath, SRCFOLDER);
	fs.mkdirSync(srcPath);
}

const workflow:Array<(projectPath:string)=>Promise<void>> = [
	_buildSrcFolder,
	_buildIndexPage
];

export const createSrcFolder = (folderName:string):Promise<void> => {
	const logger = LoggerFactory();
	const projectPath = getProjectPath(folderName);
	logger.debug(`Building Source folder for ${folderName}`);
	return executeWorkflow<string>(workflow, projectPath)
		.then(() => logger.success(`Source folder for ${folderName}`))
		.catch((err) => {
			logger.error('Could not create src directory');
			logger.error(err);
		});
    
};