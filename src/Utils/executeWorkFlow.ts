


export async function executeWorkflow<T>(workflow:Array<(args:T)=>Promise<void>>, workflowArgument:T):Promise<void> {

	for (const task of workflow) {
		await task(workflowArgument);
	}

}