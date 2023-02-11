const env = process.env.env
if (!env) throw "Environment variable required: [env]"

const appName = 'teamsrv'

const config = {
    appName,
    env:                        env,
    resourceGroup:              `${appName}-${env}-rg`,
    location:                   process.env.location || 'CentralUs',
    secrets:                    {},

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
    'deploymentPipelineClientId'
])

//const envSpecific = require(`./${env}.js`)

module.exports = {
    ...config,
    //...envSpecific
}
