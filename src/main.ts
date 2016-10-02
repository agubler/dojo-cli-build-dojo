import { Command } from 'dojo-cli/interfaces';
import register from './register';
import run from './run';

const command: Command = {
	description: 'Build dojo2 packages',
	register,
	run
};

export default command;
