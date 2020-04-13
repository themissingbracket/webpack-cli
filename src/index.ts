#! /usr/bin/env node
import { buildProject } from './ProjectBuilder/projectBuilder';
import { executeWorkflow } from './Utils/executeWorkFlow';
const WORKFLOW:Array<(projectName:string)=>Promise<void>> = [ buildProject ];

(async () => {
	const argv = process.argv.slice(2);
	const projectName = argv[0];
	await executeWorkflow(WORKFLOW, projectName);
})();
