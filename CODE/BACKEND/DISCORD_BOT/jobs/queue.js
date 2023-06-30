const throng = require("throng");
const Queue = require("bull");
const Jobs = require("./Jobs");
const config = require("../config.json");

// Connect to a local redis instance locally, and the Heroku-provided URL in production
const REDIS_URL = config.redis_url || process.env.REDIS_URL;

const MAX_JOBS_PER_WORKER = 50;

function start() {
	// Connect to the named work queue
	const workQueue = new Queue("work", REDIS_URL);

	workQueue.process(MAX_JOBS_PER_WORKER, async (job) => {
		Jobs.executeJob(job.data.command, ...job.data.args);
		job.progress(100);
	});
}

module.exports = {
	init: () => {
		// Initialize the clustered worker process
		// See: https://devcenter.heroku.com/articles/node-concurrency for more info
		//throng({ workers: 1, start });
		start();
	},
};
