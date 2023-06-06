# demo.microservice.deployment

## Manual Set up in your Azure subscription

Create a service principal
https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal

    Azure AD > App Registrations > Add
    Name it DeploymentPipeline
    Certificates&Secrets > New Client Secret

Give DeploymentPipeline permissions on your tenant

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


