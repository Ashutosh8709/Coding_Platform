import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { v4 as uuid } from "uuid";

const TEMP_DIR = path.join(process.cwd(), "temp");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

export const runCpp = (code, input = "") => {
  return new Promise((resolve) => {
    const jobId = uuid();
    const codeFile = path.join(TEMP_DIR, `${jobId}.cpp`);

    fs.writeFileSync(codeFile, code);

    const docker = spawn("docker", [
      "run",
      "--rm",
      "-i",
      "--cpus=0.5",
      "--memory=128m",
      "--network=none",
      "-v",
      `${codeFile}:/app/code.cpp`,
      "cpp-executor",
    ]);

    let stdout = "";
    let stderr = "";

    docker.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    docker.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    docker.on("close", () => {
      if (fs.existsSync(codeFile)) {
        fs.unlinkSync(codeFile);
      }

      if (stdout.includes("COMPILATION_ERROR")) {
        return resolve({
          status: "COMPILE_ERROR",
          output: stdout,
        });
      }

      if (stdout.includes("TIME_LIMIT_EXCEEDED")) {
        return resolve({
          status: "TIME_LIMIT_EXCEEDED",
          output: stdout,
        });
      }

      if (stdout.includes("RUNTIME_ERROR")) {
        return resolve({
          status: "RUNTIME_ERROR",
          output: stdout,
        });
      }

      resolve({
        status: "SUCCESS",
        output: stdout.trim(),
      });
    });

    // 🔥 send stdin correctly
    docker.stdin.write(input + "\n");
    docker.stdin.end();
  });
};
