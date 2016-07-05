const exec = require('child_process').exec;
const argv = require('minimist')(process.argv.slice(2));

const pkg = require('./package.json');

const ghToken = argv.token || process.env.GH_TOKEN;
const repo = argv.repo || process.env.REPO;
const tag = argv.repo || pkg.version;
const appName = argv.name || argv.n || pkg.productName;
const apps = `release/darwin-x64/${appName}-darwin-x64/${appName}.app,release/win32-ia32/TodoElectron-win32-ia32/TodoElectron.exe,release/win32-x64/${appName}-win32-x64/${appName}.exe`;

exec(`electron-release --app=${apps} --token=${ghToken} --repo=${repo} --tag=${tag}`,
  (err, stdout) => {
    if (err) {
      console.log(err);
    } else {
      console.log(stdout);
    }
  });
