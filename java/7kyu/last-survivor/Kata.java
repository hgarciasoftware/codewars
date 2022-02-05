public class Kata {
    public static String lastSurvivor(String letters, int[] coords) {
      StringBuilder sb = new StringBuilder(letters);

      for (int i = 0; i < coords.length; i++) {
        sb.deleteCharAt(coords[i]);
      }

      return sb.toString();
    }
}
