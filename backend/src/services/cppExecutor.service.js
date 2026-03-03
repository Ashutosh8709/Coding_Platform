import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { v4 as uuid } from "uuid";

const TEMP_DIR = path.join(process.cwd(), "temp");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

//      COMPILE STEP

export const compileCpp = async (code) => {
  return new Promise(async (resolve) => {
    const jobId = uuid();
    const codeFile = path.join(TEMP_DIR, `${jobId}.cpp`);

    try {
      await fs.promises.writeFile(codeFile, code);

      const docker = spawn("docker", [
        "run",
        "--rm",
        "--cpus=0.5",
        "--memory=128m",
        "--network=none",
        "--pids-limit=64",
        "--security-opt=no-new-privileges",
        "-v",
        `${TEMP_DIR}:/app/files`,
        "cpp-executor",
        "compile",
        jobId,
      ]);

      let output = "";

      docker.stdout.on("data", (data) => {
        output += data.toString();
      });

      docker.stderr.on("data", (data) => {
        output += data.toString();
      });

      docker.on("close", (exitCode) => {
        if (output.includes("COMPILATION_ERROR")) {
          return resolve({
            status: "COMPILE_ERROR",
            output,
            jobId,
          });
        }

        resolve({
          status: "SUCCESS",
          jobId,
        });
      });
    } catch (err) {
      resolve({
        status: "SYSTEM_ERROR",
        output: err.message,
      });
    }
  });
};

//    RUN STEP

export const runCppBinary = async (jobId, input = "") => {
  return new Promise((resolve) => {
    const docker = spawn("docker", [
      "run",
      "--rm",
      "-i",
      "--cpus=0.5",
      "--memory=128m",
      "--network=none",
      "--pids-limit=64",
      "--security-opt=no-new-privileges",
      "-v",
      `${TEMP_DIR}:/app/files`,
      "cpp-executor",
      "run",
      jobId,
    ]);

    let stdout = "";
    let stderr = "";

    docker.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    docker.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    docker.on("spawn", () => {
      docker.stdin.write(input);
      docker.stdin.end();
    });

    docker.on("close", () => {
      const output = stdout + stderr;

      if (output.includes("TIME_LIMIT_EXCEEDED")) {
        return resolve({ status: "TIME_LIMIT_EXCEEDED", output });
      }

      if (output.includes("RUNTIME_ERROR")) {
        return resolve({ status: "RUNTIME_ERROR", output });
      }

      resolve({
        status: "SUCCESS",
        output: stdout.trim(),
      });
    });
  });
};
