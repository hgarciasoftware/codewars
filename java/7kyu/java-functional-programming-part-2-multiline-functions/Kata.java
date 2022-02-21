import java.util.function.ToDoubleFunction;

public class FunctionalProgramming {
  public static ToDoubleFunction<Triangle> f = triangle -> {
    triangle.setArea(.5 * triangle.base * triangle.height);

    return triangle.getArea();
  };
}
