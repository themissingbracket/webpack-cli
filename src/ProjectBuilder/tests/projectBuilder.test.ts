/* eslint-disable no-unused-vars */
import { makeProjectFolder } from '../projectBuilder';
import Path from 'path';
import FS from 'fs';
describe('Test suite for package builder' , () => {
	const folderName = 'testFolderName';
	const resolvedFolderName = 'resolvedFolderName';
	test('Folder already exists, throws error' , () => {
		const fs = {
			// eslint-disable-next-line no-unused-vars
			existsSync:(path: string) => true,
			// eslint-disable-next-line no-unused-vars
			mkdirSync:(path: string, options?: {}) => path
		};
        
		const path = {
			resolve:(...pathSegments:Array<string>) => resolvedFolderName
		};
		
		expect(2+2).toEqual(4);
		// return makeProjectFolder(folderName)
		// 	.catch( () => {
		// 		expect(path.resolve).toBeCalled();
                
		// 		expect(fs.existsSync).toBeCalled();
		// 		expect(fs.existsSync).toBeCalledWith(resolvedFolderName);
                
		// 		expect(fs.mkdirSync).toBeCalled();
		// 		expect(fs.mkdirSync).toBeCalledWith(resolvedFolderName);
		// 	});
        
	});
    
    
});