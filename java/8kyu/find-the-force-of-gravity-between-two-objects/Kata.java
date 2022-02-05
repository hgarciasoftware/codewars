public class Solution {

  private static double toKilograms(double mass, String unit) {
    double kilograms;

    switch (unit) {
    case "g":
      kilograms = mass / 1E3;
      break;
    case "mg":
      kilograms = mass / 1E6;
      break;
    case "μg":
      kilograms = mass / 1E9;
      break;
    case "lb":
      kilograms = mass * 0.453592;
      break;
    case "kg":
    default:
      kilograms = mass;
    }

    return kilograms;
  }

  private static double toMeters(double distance, String unit) {
    double meters;

    switch (unit) {
    case "cm":
      meters = distance / 1E2;
      break;
    case "mm":
      meters = distance / 1E3;
      break;
    case "μm":
      meters = distance / 1E6;
      break;
    case "ft":
      meters = distance * 0.3048;
      break;
    case "m":
    default:
      meters = distance;
      break;
    }

    return meters;
  }

  public static double solution(double[] arrVal, String[] arrUnit) {
    double m1 = toKilograms(arrVal[0], arrUnit[0]);
    double m2 = toKilograms(arrVal[1], arrUnit[1]);
    double r = toMeters(arrVal[2], arrUnit[2]);

    return 6.67E-11 * m1 * m2 / (r * r);
  }

}
