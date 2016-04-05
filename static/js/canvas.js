var WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight,
  MAX_PARTICLES = 100,
  DRAW_INTERVAL = 60,
  container = document.querySelector('#canvasContainer'),
  canvas = document.querySelector('#pixie'),
  context = canvas.getContext('2d'),
  gradient = null,
  pixies = [];

function setDimensions(e) {
  WIDTH = window.innerWidth;
  var body = document.body;
  var html = document.documentElement;
  var height = Math.max(
    body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );
  console.log('height',height);
  HEIGHT = height;
  container.style.width = WIDTH+'px';
  container.style.height = HEIGHT+'px';
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}
setDimensions();
window.addEventListener('resize', setDimensions);

function Circle() {
  this.settings = {ttl:8000, xmax:5, ymax:2, rmax:10, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

  this.reset = function() {
    this.x = (this.settings.random ? WIDTH*Math.random() : this.settings.xdef);
    this.y = (this.settings.random ? HEIGHT*Math.random() : this.settings.ydef);
    this.r = ((this.settings.rmax-1)*Math.random()) + 1;
    this.dx = (Math.random()*this.settings.xmax) * (Math.random() < 0.5 ? -1 : 1);
    this.dy = (Math.random()*this.settings.ymax) * (Math.random() < 0.5 ? -1 : 1);
    this.hl = (this.settings.ttl/DRAW_INTERVAL)*(this.r/this.settings.rmax);
    this.rt = Math.random()*this.hl;
    this.settings.rt = Math.random()+1;
    this.stop = Math.random()*0.2+0.4;
    this.settings.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
    this.settings.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
  };

  this.fade = function() {
    this.rt += this.settings.rt;
  };

  this.draw = function() {
    if(this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
      this.settings.rt = this.settings.rt*-1;
    } else if(this.rt >= this.hl) {
      this.reset();
    }

    var newo = 1-(this.rt/this.hl);
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
    context.closePath();

    var cr = this.r*newo;
    gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
    gradient.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
    gradient.addColorStop(this.stop, 'rgba(77,101,181,'+(newo*0.6)+')');
    gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
    context.fillStyle = gradient;
    context.fill();
  };

  this.move = function() {
    this.x += (this.rt/this.hl)*this.dx;
    this.y += (this.rt/this.hl)*this.dy;
    if(this.x > WIDTH || this.x < 0) this.dx *= -1;
    if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
  };

  this.getX = function() { return this.x; };
  this.getY = function() { return this.y; };
}

for (var i = 0; i < MAX_PARTICLES; i++) {
  pixies.push(new Circle());
  pixies[i].reset();
}

function draw() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  for(var i = 0; i < pixies.length; i++) {
    pixies[i].fade();
    pixies[i].move();
    pixies[i].draw();
  }
}
setInterval(draw, DRAW_INTERVAL);

$(document).ready(function(){
  var $mountains = $('#mountains');
  var $grass = $('#grass');
  var $container = $('#canvasContainer');
  $container.mousedown(function(ev){
    var ox = ev.clientX;
    var om = parseInt($mountains.css('background-position').substr(0, $mountains.css('background-position').search(' ')));
    var og = parseInt($grass.css('background-position').substr(0, $grass.css('background-position').search(' ')));
    $container.mousemove(function(e){
      $mountains.css('background-position', om+((e.clientX-ox)/10)+'px 0px');
      $grass.css('background-position', og+((e.clientX-ox)/4)+'px 10px');
    });
    $container.mouseup(function(){
      $container.unbind('mousemove');
      $container.unbind('mouseup');
    });
  });
});
