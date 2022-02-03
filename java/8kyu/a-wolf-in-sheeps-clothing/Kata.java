public class ZywOo {

  public static String warnTheSheep(String[] array) {
    int wolfIndex = -1;

    for (int i = 0; i < array.length; i++) {
      if (array[i] == "wolf") {
        wolfIndex = i;
      } else {
        if (wolfIndex >= 0) {
          int N = array.length - wolfIndex - 1;
          return "Oi! Sheep number " + N + "! You are about to be eaten by a wolf!";
        }
      }
    }
    return "Pls go away and stop eating my sheep";
  }

}
