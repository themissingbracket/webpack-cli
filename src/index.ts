#! /usr/bin/env node

import { buildProject } from './ProjectBuilder/projectBuilder';
import { LoggerFactory } from './Logger/LoggerFactory';
import { executeWorkflow } from './Utils/executeWorkFlow';
const WORKFLOW:Array<(projectName:string)=>Promise<void>> = [ buildProject ];

const Logger  = LoggerFactory();


const argv = process.argv.slice(2);

const projectName = argv[0];


executeWorkflow<string>(WORKFLOW, projectName)
	.then(() => Logger.info(`${projectName} created`))
	.catch(Logger.error);
