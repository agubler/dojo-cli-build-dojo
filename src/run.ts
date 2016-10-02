import { Argv } from 'yargs';
import { Helper } from 'dojo-cli/interfaces';

export default async function(helper: Helper, args: Argv) {
	const installedCommands =
		helper.command.exists('compile', 'ts') &&
		helper.command.exists('install', 'typings') &&
		helper.command.exists('clean', 'file');

	if (installedCommands) {
		console.log('cleaning dist');
		await helper.command.run('clean', 'file', <any> { files: '_build/' });
		// TODO check conectivity before removing and installing typings
		console.log('cleaning typings');
		await helper.command.run('clean', 'file', <any> { files: 'typings/' });
		console.log('Install Typings');
		await helper.command.run('install', 'typings', <any> { directory: process.cwd() });
		console.log('compiling source');
		await helper.command.run('compile', 'ts', args);
	}
	else {
		throw new Error('Required commands not installed.');
	}
}
