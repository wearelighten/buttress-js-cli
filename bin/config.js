const getRootModule = (module) => (module.parent) ? getRootModule(module.parent) : module;

module.exports = require('node-env-obj')({
  basePath: process.cwd(),
  configFullPath: `${getRootModule(module).path}/config.json`,
});