FROM node:0.10.44-slim

ADD . /home/harry/dv/

RUN cd /home/harry/dv && npm install

ENTRYPOINT ["/home/harry/dv/boot.sh"]
