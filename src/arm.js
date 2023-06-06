const { header } = require('./logging')
const path       = require('path')
const bash       = require('./bash').execute
const config     = require('./config')

async function configure(vespyUiClientId) {
    header("Deploying Arm Template")

    const bicepFile = path.join(config.nodeDirectory, 'main.bicep')

    await bash(`az group create --location ${config.location} --name ${config.resourceGroup} --subscription ${config.subscriptionId}`)
    await bash(`
        az deployment group create --template-file ${bicepFile} --subscription ${config.subscriptionId} --resource-group ${config.resourceGroup} --mode complete --parameters \
        prefix=${config.prefix}             \
        simplePrefix=${config.simplePrefix} \
        location=${config.location}
    `)
}

module.exports = {
    configure
}
