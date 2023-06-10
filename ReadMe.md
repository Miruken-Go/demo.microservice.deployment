# demo.microservice.deployment

## Initial Workflow when starting the project

### Manually create deployment permissions in Azure

Create a service principal
https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal

    Azure AD > App Registrations > Add
    Name it DeploymentPipeline
    Certificates&Secrets > New Client Secret

Give DeploymentPipeline permissions

    Subscriptions > Access control (IAM)
    Add role assignement Owner

### Run the "build-and-push-deployment-image" pipeline

### Run the "deploy-shared-environment" pipeline

### Push the initial image to the shared Azure Container Repository

    TAG=initial
    IMAGE_NAME="teamsrvshared.azurecr.io/teamsrv:$TAG"; echo $IMAGE_NAME
    docker build --build-arg application_version=$TAG -t $IMAGE_NAME demo.microservice/teamsrv 
    az acr login -n teamsrvshared
    docker push $IMAGE_NAME

### Run the "deploy-environment" pipeline



## To Develop Locally

Build the Docker Container

    docker build -t demo.microservice.deployment:local .

Run the Docker Container interactively

    docker run -it -v $(pwd):/build demo.microservice.deployment:local

Execute the build

    docker run -it                                                         \
        -v $(pwd):/build                                                   \
        -e tenantId=<tenantId>                                             \
        -e subscriptionId=<subscriptionId>                                 \
        -e deploymentPipelineClientId=<deploymentPipelineClientId>         \
        -e deploymentPipelineClientSecret=<deploymentPipelineClientSecret> \
        -e env=dev                                                         \
        -e instance=craig                                                  \
        demo.microservice.deployment:local                                 \
        node /build/src


