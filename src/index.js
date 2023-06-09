const az      = require('./az');
const arm     = require('./arm');
const logging = require('./logging');
const config  = require('./config');

async function main() {
    try {
        console.log("Configuring Environment")
        logging.printConfiguration(config)
        await az.login()

        await az.registerActiveDirectoryProvider()
        await az.registerAppProvider()
        await az.registerOperationalInsightsProvider()

        //Shared resources 
        await az.createResourceGroup(config.sharedResourceGroup)
        await arm.deploySharedResources()

        //Environment resources
        await az.createResourceGroup(config.resourceGroup)

        const getAzureContainerRepositoryPassword = await az.getAzureContainerRepositoryPassword(config.containerRepositoryName)
        const environmentResources =  await arm.deployEnvironmentResources(getAzureContainerRepositoryPassword)
        const containerAppPrincipalId = environmentResources.properties.outputs.containerAppPrincipalId.value
        console.log(`containerAppPrincipalId: ${containerAppPrincipalId}`)

        //Role definitions
        //await arm.deployRolesResources(containerAppPrincipalId)

        console.log("Configuration Succeded")
    } catch (error) {
        process.exitCode = 1
        console.log(error)
        console.log("Configuration Failed")
    }
}

main()
