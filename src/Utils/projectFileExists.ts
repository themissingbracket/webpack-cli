import fs from 'fs';

export default function projectFileExists (folderPath:string):boolean {
	return fs.existsSync(folderPath);
}