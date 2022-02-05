public class Kata {
    public static Integer prevMultOfThree(int n){
      String string = Integer.toString(n);
      int i = string.length();

      while (i > 0) {
        String substring = string.substring(0, i);
        Integer nSubstring = Integer.parseInt(substring);

        if (nSubstring % 3 == 0) {
          return nSubstring;
        }

        i--;
      }

      return null;
    }
}
