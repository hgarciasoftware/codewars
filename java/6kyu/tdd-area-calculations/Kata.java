class Shape {
  private final double area;

  public Shape(double area) {
    this.area = area;
  }

  public double area() {
    return area;
  }
}

class Triangle extends Shape {
  Triangle(double base, double height) {
    super(.5 * base * height);
  }
}

class Square extends Shape {
  Square(double side) {
    super(side * side);
  }
}

class Rectangle extends Shape {
  Rectangle(double length, double width) {
    super(length * width);
  }
}

class Circle extends Shape {
  Circle(double radius) {
    super(Math.PI * radius * radius);
  }
}

class Calculator {
  private static double round(double val) {
    return Math.round(val * 100.0) / 100.0;
  }

  double getTotalArea(Shape... shapes) {
    double totalArea = 0;

    for (int i = 0; i < shapes.length; i++) {
      totalArea += shapes[i].area();
    }

    return round(totalArea);
  }
}
