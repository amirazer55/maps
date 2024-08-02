const { execSync } = require("child_process");
const path = require("path");

const runCommand = (command, cwd) => {
  console.log(`Running command: ${command} in ${cwd}`);
  try {
    execSync(command, { stdio: "inherit", cwd });
  } catch (error) {
    console.error(`Error running command: ${command} in ${cwd}`);
    console.error(error.message);
    process.exit(1);
  }
};

const frontendPath = path.join(__dirname, "geojson-frontend");
const backendPath = path.join(__dirname, "geojson-backend");

runCommand("npm install", frontendPath);
runCommand("npm run build", frontendPath);
runCommand("npm install", backendPath);

runCommand(
  'npx concurrently "npm start --prefix geojson-backend" "npm run start --prefix geojson-frontend"',
  __dirname
);
