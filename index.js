#!/usr/bin/env node

/**
 * vercel-no-comments
 * Prevents the Vercel for GitHub integration from adding comments to pull requests and commits
 *
 * @author Ahmad Awais <https://twitter.com/MrAhmadAwais/>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const fs = require('fs');
const executeGitCommand = require('./utils/executeGitCommand');

const content = {
	github: {
		silent: true
	}
};

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	try {
		fs.writeFileSync('vercel.json', JSON.stringify(content, null, 2));
		console.log('📄 Created vercel.json file');
		executeGitCommand('add vercel.json');
		executeGitCommand(
			'commit -m "📦 NEW: Prevent Comments on GitHub from Vercel"'
		);
		console.log('🎉 Successfully committed vercel.json');
	} catch (error) {
		console.error('❌ Error occurred while creating vercel.json:', error);
	}

	debug && log(flags);
})();
