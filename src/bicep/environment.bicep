@description('Standard envs are dev, qa, prod')
param prefix               string
param appName              string
param location             string 

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
// resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-01-01-preview' existing = {
//   name: containerRepository
//   scope: resourceGroup(sharedResourceGroup)
// }

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
  identity: {
    type: 'SystemAssigned'
  }
  properties:{
    managedEnvironmentId: containerAppsEnvironment.id
    configuration: {
      activeRevisionsMode: 'Multiple'
      ingress: {
        targetPort: 80
        external: true
      }
      registries: [
        {
          identity: 'system'
          server:   'teamsrvshared.azurecr.io'
        }
      ]
    }
    template: {
      containers: [
        {
          image: 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest' 
          name:  'simple-hello-world-container'
        }
      ]
    }
  }
}

// resource acrPullRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
//   scope: subscription()
//   name: '7f951dda-4ed3-4680-a7ca-43fe172d538d'
// }

// resource containerApp_ACR_role 'Microsoft.Authorization/roleAssignments@2020-08-01-preview' = {
//   name:  guid(containerApp.id, containerRegistry.id)
//   properties: {
//     roleDefinitionId: acrPullRoleDefinition.id 
//     description:      'Container Registry AcrPull'
//     principalId:      containerApp.identity.principalId
//   }
// }

output containerAppPrincipalId string = containerApp.identity.principalId

