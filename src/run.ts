import { Argv } from 'yargs';
import { Helper } from 'dojo-cli/interfaces';
import * as chalk from 'chalk';

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
		console.info(chalk.underline(`Cleaning target directory \'${cleanDirectory}\'\n`));
		await helper.command.run('clean', 'file', <any> { files: cleanDirectory });
		// TODO check conectivity before removing and installing typings
		console.info(chalk.underline('Cleaning \'typings\' directory\n'));
		await helper.command.run('clean', 'file', <any> { files: 'typings' });
		await helper.command.run('install', 'typings', <any> { directory: process.cwd() });
		await helper.command.run('compile', 'ts', args);
		console.info(chalk.green.bold(`\n${args.type} build completed!`));
	}
	else {
		throw new Error('Required commands not installed.');
	}
}
