#!/bin/bash

checkEnvironmentVariables() {
  echo 'Checking for required environment variables....'
  if [[ -z $MONGO_API_URL ]]; then
    echo 'MONGO_API_URL not found. Exiting.'
    exit 1;
  fi
  echo 'All variables are present.'
}
startServer() {
  cd /home/harry/dv
  echo 'server started without forever'
  node server.js
}
main() {
  checkEnvironmentVariables
  startServer
}

main
