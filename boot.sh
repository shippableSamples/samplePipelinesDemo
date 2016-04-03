#!/bin/bash

if [[ $MONGO_API_URL = '' ]]; then
  echo 'Error: Environment variable "MONGO_API_URL" not found'
  exit 1;
fi

bower install

echo MONGO_API_URL found:  $MONGO_API_URL;

cd /home/harry/dv

if [[ ENVIRONMENT='local' ]]; then
  echo 'cron running with forever'
  forever -w -v server.js
else
  echo 'cron running without forever'
  node server.js
fi
