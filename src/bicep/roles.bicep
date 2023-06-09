param containerAppPrincipalId string 

targetScope = 'subscription'

resource acrPullRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
  scope: subscription()
  name: '7f951dda-4ed3-4680-a7ca-43fe172d538d'
}

resource containerApp_ACR_role 'Microsoft.Authorization/roleAssignments@2020-08-01-preview' = {
  name:  guid(containerAppPrincipalId)
  properties: {
    roleDefinitionId: acrPullRoleDefinition.id 
    description:      'Container Registry AcrPull'
    principalId:      containerAppPrincipalId 
  }
}
