const getRootModule = (module) => (module.parent) ? getRootModule(module.parent) : module;

const fs = require('fs');

const Config = require('node-env-obj')({
  basePath: process.cwd(),
  configFullPath: `${getRootModule(module).path}/config.json`,
});

try {
  let store = fs.readFileSync(`.connections`, 'utf8');
  store = JSON.parse(store);
  if (store.lastConnection !== null && store.connections[store.lastConnection]) {
    Config.auth.buttress.url = store.connections[store.lastConnection].url;
    Config.auth.buttress.appToken = store.connections[store.lastConnection].token;
    Config.auth.buttress.apiPath = store.connections[store.lastConnection].apiPath;
    Config.auth.buttress.configured = 'true';
  }
} catch (err) {}

module.exports = Config