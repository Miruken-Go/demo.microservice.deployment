@description('Standard envs are dev, qa, prod')
//param env     string
param prefix   string
param location string 

// var subscriptionId = subscription().subscriptionId
// var tenantId       = subscription().tenantId
// var useDevSetting  = contains(env, 'dev')
// var useProdSetting = contains(env, 'prod')


/////////////////////////////////////////////////////////////////////////////////////
// Container Apps Environment
/////////////////////////////////////////////////////////////////////////////////////
resource conainterAppsEnvironment 'Microsoft.App/managedEnvironments@2022-10-01' = {
  name: '${prefix}-CAE'
  location: location
  sku: {
    name: 'Consumption'
  }
  properties: {
    zoneRedundant: false
    customDomainConfiguration: {}
  }
}
