FROM node:18.16.0

#Install AZ
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

CMD ["/bin/sh"]





