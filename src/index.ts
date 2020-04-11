import { makeProjectFolder } from './ProjectBuilder/projectBuilder';
import { BuildPackageJson } from './PackageBuilder/PackageBuilder';

const WORKFLOW:Array<(projectName:string)=>Promise<void>> = [
	makeProjectFolder,
	BuildPackageJson
];


async function _executeWorkFlow(projectName:string, workflow:Array<(projectName:string)=>Promise<void>>):Promise<void> {
	if(workflow.length === 0) return Promise.resolve();
	const [currentTask, ...rest] =  workflow;
	await currentTask(projectName);
	_executeWorkFlow(projectName, rest);
}


const projectFile = 'TaskPlannerClient';
_executeWorkFlow(projectFile, WORKFLOW)
	.then(() => {
		console.log(`${projectFile} created`);
	}).catch(console.error);
