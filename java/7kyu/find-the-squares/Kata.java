public class Solution{
  public static String findSquares(int n){
    long bigger = (n + 1) / 2;
    bigger = bigger * bigger;

    long smaller = (n - 1) / 2;
    smaller = smaller * smaller;

    return bigger + "-" + smaller;
  }
}
