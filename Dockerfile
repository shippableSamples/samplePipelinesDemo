FROM shipimg/appbase:latest

ADD . /home/harry/dv/

RUN npm install bower -g
RUN cd /home/harry/dv && npm install && bower install --allow-root

ENTRYPOINT ["/home/harry/dv/boot.sh"]
