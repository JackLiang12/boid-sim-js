class Boid{
    constructor(){
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;
    }

    align(boids) {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for(let other of boids){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other != this && d < perceptionRadius){
                steering.add(other.velocity);
                total++;
            }
        }
        if(total > 0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce)
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for(let other of boids){
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y);

            if(other != this && d < perceptionRadius){
                steering.add(other.position);
                total++;
            }
        }
        if(total > 0){
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce)
        }
        return steering;
    }

    seperation(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for(let other of boids){
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y);

            if(other != this && d < perceptionRadius){
                let diff = p5.Vector.sub(this.position, other.position);
                diff.mult(1/d);
                steering.add(diff);
                total++;
            }
        }
        if(total > 0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce)
        }
        return steering;
    }

    avoid(obstacles) {
        let perceptionRadius = 50;
        let avoidanceForce = createVector();
        let total = 0;
        for (let obstacle of obstacles) {
            let d = dist(this.position.x, this.position.y, obstacle.position.x, obstacle.position.y);
            
            if (d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, obstacle.position);
                diff.div(d * d); // Adjust the force inversely proportional to the square of the distance
                avoidanceForce.add(diff);
                total++;
            }
        }
        if (total > 0) {
            avoidanceForce.div(total);
            avoidanceForce.setMag(this.maxSpeed);
            avoidanceForce.sub(this.velocity);
            avoidanceForce.limit(this.maxForce);
        }
        return avoidanceForce;
    }


    flock(boids, obstacle){
        this.acceleration.set(0,0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let seperation = this.seperation(boids);
        let avoid = this.avoid(obstacle);

        seperation.mult(seperationSlider.value());
        cohesion.mult(cohesionSlider.value());
        alignment.mult(alignSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation);
        this.acceleration.add(avoid.mult(2));
    }



    edges(){
        if (this.position.x > width){
            this.position.x = 0;
        }else if(this.position.x < 0){
            this.position.x = width;
        }
        if (this.position.y > width){
            this.position.y = 0;
        }else if(this.position.y < 0){
            this.position.y = width;
        }
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }


    show(){
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y);
    }


}
