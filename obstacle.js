class obstacle{
    constructor(x, y) {
        this.position = createVector(x, y);
        this.width = 50; // Width of the rectangle
        this.height = 30; // Height of the rectangle
      }
      show() {
        // Draw a rectangle for the obstacle
        rectMode(CENTER); // Draw from the center
        noStroke(); // No border
        fill(255, 0, 0); // Fill color (e.g., red)
        rect(this.position.x, this.position.y, this.width, this.height);
      }
}
