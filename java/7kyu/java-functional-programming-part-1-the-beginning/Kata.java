import java.util.function.Function;

public class FunctionalProgramming {
  public static Function<Student, Boolean> f = stu -> stu.getFullName().equals("John Smith") && stu.studentNumber.equals("js123");
}
