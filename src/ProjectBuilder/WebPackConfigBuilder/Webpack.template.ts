


type IWebpackConfig = Record<string, any>
function _createWebpackConfig():IWebpackConfig{
	return {

	};
}

async function _buildWebPackConfig(projectPath:string, config:IWebpackConfig):Promise<void> {
	const { default:path }  = await import('path');
	const { default:fs } = await import('fs');
	const webpackPath = path.join(projectPath,'webpack.config.js');

	fs.writeFileSync(webpackPath, JSON.stringify(config, null, 2));
    
	
}

export default async function buildWebPackConfig(projectPath:string ):Promise<void> {

	const webpackConfig =  _createWebpackConfig();
	await _buildWebPackConfig(projectPath, webpackConfig);
}
