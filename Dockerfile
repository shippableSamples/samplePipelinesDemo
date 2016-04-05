FROM node:0.10.44-slim

ADD . /home/harry/dv/
ADD /usr/lib/node_modules/bower/bin/bower /usr/lib/node_modules/bower/bin/bower

RUN npm install bower -g
RUN cd /home/harry/dv && npm install && bower install --allow-root

ENTRYPOINT ["/home/harry/dv/boot.sh"]
