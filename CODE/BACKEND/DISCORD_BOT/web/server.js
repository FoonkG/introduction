const express = require("express");
const Queue = require("bull");
const config = require("../config.json");

// Serve on PORT on Heroku and on localhost:5000 locally
const PORT = 3000;
// Connect to a local redis intance locally, and the Heroku-provided URL in production
const REDIS_URL = config.redis_url;

(async () => {
	const app = express();

	// Create / Connect to a named work queue
	const workQueue = new Queue("work", REDIS_URL);

	// Kick off a new job by adding it to the work queue
	app.get("/status", async (req, res) => {
		const job = await workQueue.add({ command: "status", msg: "Hello World" });
		res.json({ id: job.id });
	});

	app.get("/status/:msg", async (req, res) => {
		const msg = req.params.msg;

		const job = await workQueue.add({ command: "status", args: [msg] });
		res.json({ id: job.id });
	});

	app.get("/set-balance/:userid/:balance", async (req, res) => {
		const userid = req.params.userid;
		const balance = req.params.balance;

		const job = await workQueue.add({ command: "set-balance", args: [userid, balance] });
		res.json({ id: job.id });
	});

	// Allows the client to query the state of a background job
	app.get("/job/:id", async (req, res) => {
		const id = req.params.id;
		const job = await workQueue.getJob(id);

		if (job === null) {
			res.status(404).end();
		} else {
			const state = await job.getState();
			const progress = job._progress;
			const reason = job.failedReason;
			res.json({ id, state, progress, reason });
		}
	});

	app.get("*", async (req, res) => {
		res.send("Sorry, this is an invalid URL");
	});

	app.listen(PORT, () => console.log("Server started on port: " + PORT + " redis url: " + REDIS_URL + ""));
})();
