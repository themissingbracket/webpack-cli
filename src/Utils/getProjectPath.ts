import path from 'path';

export default function getProjectPath(projectName:string) :string {
	return path.resolve(process.cwd(), projectName);
}