


export async function executeWorkflow<T>(workflow:Array<(args:T)=>Promise<void>>, workflowArgument:T):Promise<void> {
	if(workflow.length === 0 ) return Promise.resolve();
	const [currentTask, ...rest ] = workflow;

	await currentTask(workflowArgument);

	executeWorkflow(rest, workflowArgument);

}