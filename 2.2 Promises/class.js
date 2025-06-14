class Rectangle {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  area() {
    const area = this.width * this.height;
    return area;
  }

  paint() {
    console.log(`Painting with color ${this.color}`);
  }

}

const rect = new Rectangle(2,4,"red");
const area = rect.area();
rect.paint();
console.log(area);


/// Inbuild JS classes

const map = new Map();
map.set('name', 'Siddhesh');
map.set('age', 27);
console.log(map.get('name'));