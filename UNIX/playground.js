const { spawn, exec } = require("node:child_process");
const {stdin, stdout, stderr} = require("node:process");

const subprocess = spawn("ls", ['-l']);

// stdin.on("data", (data) => {
//   stdout.write(`Got this data from standard in: ${data.toString("utf-8")}`);
// })

stdout.write("This is some text that I want \n");
stderr.write("This is some text that I may not want \n");

// stdout.on("data", (data) => {
//   console.log(data.toString());
// });

// exec('ls -l', (error, stdout, stderr) => {
//   if(stderr) {
//     console.error(error);
//     return;
//   }

//   console.log(stdout);

//   console.log(`stderr: ${stderr}`);
// })
