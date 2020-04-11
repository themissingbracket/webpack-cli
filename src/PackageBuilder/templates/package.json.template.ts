
type IDependency = Record<string, string>

export interface IPackage {
    name: string,
    version: string,
    description: string,
    author: string,
    license: string,
    devDependencies: IDependency,
    dependencies: IDependency
}

const PACKAGE_TEMPLATE:IPackage = {
	name: '',
	version: '0.0.1',
	description: '',
	author:'',
	license: 'MIT',
	devDependencies: {},
	dependencies: {}
};

export function buildPackageJson(projectName:string):Promise<IPackage> {
	return new Promise((resolve, reject) => {
		const pckg = { ...PACKAGE_TEMPLATE };
		pckg.name = projectName.toLowerCase();
        
		resolve(pckg);
	});
}