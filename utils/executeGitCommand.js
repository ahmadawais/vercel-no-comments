const { exec } = require('child_process');

module.exports = command => {
	exec(`git ${command}`, (error, stdout, stderr) => {
		if (error) {
			console.error(
				`❌ Error executing git ${command}: ${error.message}`
			);
			return;
		}

		if (stderr) {
			console.error(`❌ Git ${command} error: ${stderr}`);
			return;
		}

		console.log(`✅ Git ${command} success`);
	});
};
