import java.util.Arrays;

public class Kata {
  public static String createPhoneNumber(int[] numbers) {
    Object[] numberObjects = new Integer[numbers.length];

    for (int i = 0; i < numbers.length; i++) {
      numberObjects[i] = Integer.valueOf(numbers[i]);
    }

    return String.format("(%d%d%d) %d%d%d-%d%d%d%d", numberObjects);
  }
}
