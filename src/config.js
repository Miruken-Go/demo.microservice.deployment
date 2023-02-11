const env = process.env.env
if (!env) throw "Environment variable required: [env]"

const appName  = 'teamsrv'
const instance = process.env.instance
const prefix   = (instance) 
    ? `${appName}-${env}-${instance}`
    : `${appName}-${env}`

const config = {
    workingDirectory: process.cwd(),
    nodeDirectory:    __dirname,
    env,
    instance,
    appName,
    prefix,
    resourceGroup: `${prefix}-rg`,
    location:      process.env.location || 'CentralUs',
    secrets:       {},

    requiredSecrets: function (names) {
        names.forEach(function(name) {
            const variable = process.env[name]
            if (!variable){
                throw `Environment variable secret required: ${name}`
            }
            this.secrets[name] = variable
        }.bind(this));
    },
    requiredNonSecrets: function (names) {
        names.forEach(function(name) {
            const variable = process.env[name]
            if (!variable){
                throw `Environment variable required: ${name}`
            }
            this[name] = variable
        }.bind(this));
    }
}

config.requiredSecrets([
    'deploymentPipelineClientSecret'
])

config.requiredNonSecrets([
    'tenantId',
    'subscriptionId',
    'deploymentPipelineClientId'
])

//const envSpecific = require(`./${env}.js`)

module.exports = {
    ...config,
    //...envSpecific
}
