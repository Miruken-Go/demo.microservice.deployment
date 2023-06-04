const bash       = require('./bash')
const config     = require('./config')
const { header } = require('./logging')

async function login() {
    header('Logging into az')
    await bash.execute(`az login --service-principal --username ${config.deploymentPipelineClientId} --password ${config.secrets.deploymentPipelineClientSecret} --tenant ${config.tenantId}`);
}

//https://learn.microsoft.com/en-us/azure/azure-resource-manager/troubleshooting/error-register-resource-provider?tabs=azure-cli
async function registerForActiveDirectoryIfNeeded() {
    header('Checking Active Directory Provider Registration')
    const providers = await bash.json(`az provider list --query "[?namespace=='Microsoft.AzureActiveDirectory']" --output json`)
    if (providers.length) {
        const provider =  providers[0];
        if (provider.registrationState === "NotRegistered") {
            header('Registering Active Directory Provider')
            await bash.execute(`az provider register --namespace Microsoft.AzureActiveDirectory --wait`);
        }
    }
}

module.exports = {
    login,
    registerForActiveDirectoryIfNeeded
}