const { spawn, exec } = require("node:child_process");

const subprocess = spawn("ls", ['-l']);

subprocess.stdout.on("data", (data) => {
  console.log(data.toString());
});

exec('ls -l', (error, stdout, stderr) => {
  if(stderr) {
    console.error(error);
    return;
  }

  console.log(stdout);

  console.log(`stderr: ${stderr}`);
})
