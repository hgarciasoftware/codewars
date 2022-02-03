public class Kata {
  public static int[] flip(char dir, int[] arr) {
    int[] copyOfArr = java.util.Arrays.copyOf(arr, arr.length);

    if (dir == 'L') {
      java.util.Arrays.sort(copyOfArr);
      org.apache.commons.lang3.ArrayUtils.reverse(copyOfArr);
    } else {
      java.util.Arrays.sort(copyOfArr);
    }

    return copyOfArr;
  }
}
