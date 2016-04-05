FROM node:0.10.44-slim

ADD . /home/harry/dv/

RUN npm install bower -g
RUN apt-get install git
RUN cd /home/harry/dv && npm install && bower install --allow-root

ENTRYPOINT ["/home/harry/dv/boot.sh"]
