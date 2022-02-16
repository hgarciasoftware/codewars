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

  double getTotalArea() {
    return 0;
  }

  double getTotalArea(Shape a) {
    return round(a.area());
  }

  double getTotalArea(Shape a, Shape b) {
    return round(a.area() + b.area());
  }

  double getTotalArea(Shape a, Shape b, Shape c) {
    return round(a.area() + b.area() + c.area());
  }

  double getTotalArea(Shape a, Shape b, Shape c, Shape d, Shape e) {
    return round(a.area() + b.area() + c.area() + d.area() + e.area());
  }

  double getTotalArea(Shape a, Shape b, Shape c, Shape d, Shape e, Shape f, Shape g, Shape h) {
    return round(a.area() + b.area() + c.area() + d.area() + e.area() + f.area() + g.area() + h.area());
  }
}
