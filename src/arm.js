const { header } = require('./logging')
const bash       = require('./bash').execute
const config     = require('./config')

async function configure(vespyUiClientId) {
    header("Deploying Arm Template")

    const params  = JSON.stringify(config.armParams)

    await bash('echo "Bash Working Directory: $(pwd)"')
    await bash(`az login --service-principal --username ${config.deploymentPipelineClientId} --password ${config.secrets.deploymentPipelineClientSecret} --tenant ${config.tenantId}`)
    await bash(`az group create --location ${config.location} --name ${config.resourceGroup} --subscription ${config.subscriptionId}`)
    await bash(`az deployment group create --template-file ./vespy-environment/src/arm/main.bicep --subscription ${config.subscriptionId} --resource-group ${config.resourceGroup} --mode complete --parameters env=${config.env} b2cVespyUiClientId=${vespyUiClientId} jumpBoxEngineeringPassword='${config.secrets.jumpBoxEngineeringPassword}' --parameters '${params}'`)
}

module.exports = {
    configure
}
