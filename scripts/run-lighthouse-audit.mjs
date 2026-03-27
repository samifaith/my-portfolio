import http from "node:http";
import { spawn } from "node:child_process";

const HOST = "127.0.0.1";
const PORT = 4173;
const AUDIT_URL = `http://${HOST}:${PORT}`;
const REPORT_PATH = "./lighthouse-report.html";

function runCommand(command, args, label) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			stdio: "inherit",
			env: process.env,
			shell: false,
		});

		child.on("error", (error) => {
			reject(new Error(`${label} failed to start: ${error.message}`));
		});

		child.on("exit", (code) => {
			if (code === 0) {
				resolve();
				return;
			}
			reject(new Error(`${label} exited with code ${code}`));
		});
	});
}

function waitForServer(maxAttempts = 60, intervalMs = 500) {
	return new Promise((resolve, reject) => {
		let attempt = 0;

		const ping = () => {
			attempt += 1;
			const request = http.get(AUDIT_URL, (response) => {
				response.resume();
				if (response.statusCode && response.statusCode < 500) {
					resolve();
					return;
				}
				if (attempt >= maxAttempts) {
					reject(new Error("Preview server did not become ready in time."));
					return;
				}
				setTimeout(ping, intervalMs);
			});

			request.on("error", () => {
				if (attempt >= maxAttempts) {
					reject(new Error("Preview server did not become ready in time."));
					return;
				}
				setTimeout(ping, intervalMs);
			});

			request.setTimeout(1000, () => {
				request.destroy();
			});
		};

		ping();
	});
}

function stopProcess(child) {
	return new Promise((resolve) => {
		if (!child || child.killed) {
			resolve();
			return;
		}

		const timeout = setTimeout(() => {
			child.kill("SIGKILL");
		}, 3000);

		child.once("exit", () => {
			clearTimeout(timeout);
			resolve();
		});

		child.kill("SIGTERM");
	});
}

async function main() {
	await runCommand("npm", ["run", "build"], "Build");

	const previewProcess = spawn(
		"npm",
		["run", "preview", "--", "--host", HOST, "--port", String(PORT), "--strictPort"],
		{
			stdio: "inherit",
			env: process.env,
			shell: false,
		},
	);

	previewProcess.on("error", (error) => {
		throw new Error(`Preview server failed to start: ${error.message}`);
	});

	const cleanup = async () => {
		await stopProcess(previewProcess);
	};

	process.once("SIGINT", async () => {
		await cleanup();
		process.exit(130);
	});

	process.once("SIGTERM", async () => {
		await cleanup();
		process.exit(143);
	});

	try {
		await waitForServer();
		await runCommand(
			"npx",
			[
				"-y",
				"lighthouse",
				AUDIT_URL,
				"--preset=desktop",
				"--only-categories=performance",
				"--chrome-flags=--headless=new",
				"--output=html",
				`--output-path=${REPORT_PATH}`,
			],
			"Lighthouse audit",
		);
		console.log(`\nLighthouse report generated at ${REPORT_PATH}`);
	} finally {
		await cleanup();
	}
}

main().catch((error) => {
	console.error(`\nAudit failed: ${error.message}`);
	process.exit(1);
});
