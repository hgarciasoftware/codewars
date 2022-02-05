public class ZywOo {
  public static int sumOfDifferences(int[] arr) {
    int[] copyOfArr = java.util.Arrays.copyOf(arr, arr.length);

    java.util.Arrays.sort(copyOfArr);
    org.apache.commons.lang3.ArrayUtils.reverse(copyOfArr);

    int sum = 0;

    for (int i = 0; i < copyOfArr.length - 1; i++) {
      sum += copyOfArr[i] - copyOfArr[i + 1];
    }

    return sum;
  }
}
