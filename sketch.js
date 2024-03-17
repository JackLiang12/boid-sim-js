const flock = [];
const obstacles = [];
let alignSlider, cohesionSlider, seperationSlider;
function setup(){
    createCanvas(1280, 720);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    seperationSlider = createSlider(0, 5, 1, 0.1);
    for(let i = 0; i < 200; i++){
    flock.push(new Boid());
    }
}

function draw(){
    background(51);
    for (let boid of flock ){
        boid.edges();
        boid.flock(flock,obstacles);
        boid.update();
        boid.show();
    }
    for (let obstacle of obstacles) {
        obstacle.show();
      }

}
function mouseClicked() {
    obstacles.push(new obstacle(mouseX, mouseY));
  }
