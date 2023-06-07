@description('Standard envs are dev, qa, prod')
//param env     string
param prefix       string
param simplePrefix string
param appName      string
param location     string 

// var subscriptionId = subscription().subscriptionId
// var tenantId       = subscription().tenantId
// var useDevSetting  = contains(env, 'dev')
// var useProdSetting = contains(env, 'prod')

/////////////////////////////////////////////////////////////////////////////////////
// Azure Monitor
/////////////////////////////////////////////////////////////////////////////////////

// resource logAnalyticsWorkspace'microsoft.operationalinsights/workspaces@2021-06-01' = {
//   name: '${prefix}-log-analytics-workspace'
//   location: location
//   properties: {
//     sku: {
//       name: 'PerGB2018'
//     }
//     retentionInDays: 30
//     features: {
//       enableLogAccessUsingOnlyResourcePermissions: true
//     }
//   }
// }

/////////////////////////////////////////////////////////////////////////////////////
// Container Apps Environment
/////////////////////////////////////////////////////////////////////////////////////
resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-01-01-preview' = {
  name: simplePrefix
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

/////////////////////////////////////////////////////////////////////////////////////
// Container Apps
/////////////////////////////////////////////////////////////////////////////////////
resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2022-10-01' = {
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

resource containerApp 'Microsoft.App/containerApps@2022-03-01' ={
  name: appName 
  location: location
  properties:{
    managedEnvironmentId: containerAppsEnvironment.id
    configuration: {
      ingress: {
        targetPort: 80
        external: true
      }
    }
    template: {
      containers: [
        {
          image: 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
          name: 'simple-hello-world-container'
        }
      ]
    }
  }
}
