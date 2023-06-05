# demo.microservice.deployment

## Manual Set up in Azure

Create a service principal
https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal

    Azure AD > App Registrations > Add
    Name it DeploymentPipeline
    Certificates&Secrets > New Client Secret

Give DeploymentPipeline permissions on your tenant

## Docker

### Build Docker Container

    docker build -t demo.microservice.deployment:latest .

### 
    docker run -it -v $(pwd):/build demo.microservice.deployment:latest


