FROM reg-gitlab.btcbit.loc:3343/container/node/nodejs:12.3.1.1-alpine

# Create app directory
WORKDIR /usr/src/app



EXPOSE 8080
CMD npm install && npm start