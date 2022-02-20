import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Troll {
  public static String disemvowel(String str) {
    Pattern p = Pattern.compile("[aeiou]", Pattern.CASE_INSENSITIVE);
    Matcher m = p.matcher(str);

    return m.replaceAll("");
  }
}
