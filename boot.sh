#!/bin/bash

startServer() {
  cd /home/demo/dv
  echo 'server started'
  node server.js
}
main() {
  startServer
}

main
