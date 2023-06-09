const { header } = require('./logging')
const path       = require('path')
const bash       = require('./bash')
const config     = require('./config')

async function deploySharedResources() {
    header("Deploying Shared Arm Template")

    const bicepFile = path.join(config.nodeDirectory, 'bicep/shared.bicep')

    return await bash.json(`
        az deployment group create                                        \
            --template-file ${bicepFile}                                  \
            --subscription ${config.subscriptionId}                       \
            --resource-group ${config.sharedResourceGroup}                \
            --mode complete                                               \
            --parameters                                                  \
                containerRepositoryName=${config.containerRepositoryName} \
                location=${config.location}                               \
    `)
}

async function deployEnvironmentResources(containerRepositoryPassword) {
    header("Deploying EnvironmentArm Template")

    const bicepFile = path.join(config.nodeDirectory, 'bicep/environment.bicep')

    return await bash.json(`
        az deployment group create                                         \
            --template-file ${bicepFile}                                   \
            --subscription ${config.subscriptionId}                        \
            --resource-group ${config.resourceGroup}                       \
            --mode complete                                                \
            --parameters                                                   \
                prefix=${config.prefix}                                    \
                appName=${config.appName}                                  \
                location=${config.location}                                \
                containerRepositoryName=${config.containerRepositoryName}  \
                containerRepositoryPassword=${containerRepositoryPassword} \
    `)
}

async function deployRolesResources(containerAppPrincipalId) {
    header("Deploying Roles Template")

    const bicepFile = path.join(config.nodeDirectory, 'bicep/roles.bicep')

    return await bash.json(`
        az deployment sub create                                   \
            --template-file ${bicepFile}                           \
            --location ${config.location}                          \
            --subscription ${config.subscriptionId}                \
            --parameters                                           \
                containerAppPrincipalId=${containerAppPrincipalId} \
    `)
}


module.exports = {
    deployEnvironmentResources,
    deploySharedResources,
    deployRolesResources
}
