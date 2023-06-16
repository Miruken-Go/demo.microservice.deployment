NAME=teamsrv
APP_NAME="${NAME}-${ENV}-${INSTANCE}"
RESOURCE_GROUP=${NAME}-${ENV}-${INSTANCE}-rg

IMAGE_NAME="${NAME}shared.azurecr.io/${NAME}:$TAG"; 
echo "RESOURCE_GROUP: $RESOURCE_GROUP"
echo "APP_NAME: $APP_NAME"
echo "IMAGE_NAME: $IMAGE_NAME"

az login --service-principal --username $DEPLOYMENT_PIPELINE_CLIENT_ID  --password $DEPLOYMENT_PIPELINE_CLIENT_SECRET --tenant $TENANT_ID
az containerapp update      \
    -n $APP_NAME            \
    -g $RESOURCE_GROUP      \
    --image $IMAGE_NAME     \
    --container-name $NAME  \
    --revision-suffix $TAG  \