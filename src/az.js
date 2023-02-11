const bash       = require('./bash').execute
const config     = require('./config')
const { header } = require('./logging')

async function login() {
    header('Logging into az')
    await bash(`az login --service-principal --username ${config.deploymentPipelineClientId} --password ${config.secrets.deploymentPipelineClientSecret} --tenant ${config.tenantId}`);
}

module.exports = {
    login
}