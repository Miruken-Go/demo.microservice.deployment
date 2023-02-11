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
    // appLogsConfiguration: {
    //   destination: 'log-analytics'
    //   logAnalyticsConfiguration: {
    //     customerId: 'cbf4e59f-cf78-4946-bb55-2421904cafa1'
    //   }
    // }
    zoneRedundant: false
    customDomainConfiguration: {}
  }
}
