FROM shipimg/appbase:latest

ADD . /home/harry/dv/

RUN cd /home/harry/dv && npm install

ENTRYPOINT ["/home/harry/dv/boot.sh"]
