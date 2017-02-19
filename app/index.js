class Mover {
  constructor(v) {
    this.maxSpeed = 5;
    this.rotation;
    this.position = v;
    this.velocity = createVector(0, 0);
    this.acceleration =  createVector(0, 0);

  }

  update() {
    const mouse = createVector(mouseX, mouseY);
    this.acceleration = p5.Vector.sub(mouse, this.position);
    this.acceleration.setMag(0.2);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    const vd = p5.Vector.sub(mouse, this.position);
    this.rotation = atan2(vd.y, vd.x);
  }

  draw() {
    push();
      translate(this.position.x, this.position.y);
      rotate(this.rotation);
      noStroke();
      image(pug, 0, 0, 50, 50);
    pop();
  }
}

let movers = [];
let pug;

window.preload = function() {
  pug = loadImage(require('./pug.png'));
}

window.setup = function() {
  const { innerWidth, innerHeight } = window;

  createCanvas(innerWidth, innerHeight);

  for (let i = 0; i < 20; i += 1) {
    movers.push(new Mover(
      new p5.Vector(random(0, width), random(0, height))
    ));
  }
}

window.draw = function() {
  background('#000000');

  movers.forEach((mover) => {
    mover.update();
    mover.draw();
  });
}

window.windowResized = function() {
  const { innerWidth, innerHeight } = window;

  resizeCanvas(innerWidth, innerHeight);
}


new p5();
