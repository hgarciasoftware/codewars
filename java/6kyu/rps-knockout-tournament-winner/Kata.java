import java.util.*;

class Player implements RockPaperScissorsPlayer {
  private String lastShape;
  private String opponentName;

  public String getName() {
    return "MyPlayer";
  }

  public void setNewMatch(String opponentName) {
    this.lastShape = "";
    this.opponentName = opponentName;
  }

  public String getShape() {
    if (opponentName == "Jonathan Hughes") {
      if (lastShape == "S") {
        lastShape = "R";

        return "R";
      }

      if (lastShape == "R") {
        lastShape = "P";

        return "P";
      }

      if (lastShape == "P" || lastShape == "") {
        lastShape = "S";

        return "S";
      }
    }

    if (opponentName == "Max Janssen") {
      return "P";
    }

    return "R";
  }

  public void setOpponentShape(String shape) {}
}
