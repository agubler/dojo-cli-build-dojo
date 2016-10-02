import { Argv } from 'yargs';
import { Helper } from 'dojo-cli/interfaces';

export interface DojoBuildArgs extends Argv {
	type: 'dev' | 'dist';
}

export default async function(helper: Helper, args: DojoBuildArgs) {
	const installedCommands =
		helper.command.exists('compile', 'ts') &&
		helper.command.exists('install', 'typings') &&
		helper.command.exists('clean', 'file');

	const cleanDirectory = args.type === 'dev' ? '_build' : 'dist';

	if (installedCommands) {

		await helper.command.run('clean', 'file', <any> { files: cleanDirectory });
		// TODO check conectivity before removing and installing typings
		await helper.command.run('clean', 'file', <any> { files: 'typings/' });
		await helper.command.run('install', 'typings', <any> { directory: process.cwd() });
		await helper.command.run('compile', 'ts', args);
	}
	else {
		throw new Error('Required commands not installed.');
	}
}
