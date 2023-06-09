param containerRepository string
param location            string 

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-01-01-preview' = {
  name:     containerRepository
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

output containerRegistryUrl string = containerRegistry.properties.loginServer
