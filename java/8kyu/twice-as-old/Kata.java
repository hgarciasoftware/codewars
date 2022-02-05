public class TwiceAsOld{

  public static int TwiceAsOld(int dadYears, int sonYears){
    for (int i = 0; i <= dadYears; i++) {
      if ((dadYears - i) == 2 * (sonYears - i) || (dadYears + i) == 2 * (sonYears + i)) {
        return i;
      }
    }
    return -1;
  }

}
