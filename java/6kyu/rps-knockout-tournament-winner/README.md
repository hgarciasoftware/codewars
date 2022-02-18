# RPS Knockout Tournament Winner

https://www.codewars.com/kata/58691792a44cfcf14700027c

A [rock-paper-scissors](https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors) robo player paticipates regularly in the same knockout tournament but almost always without succes. Can you improve this robo player and make it a tournament winner?

<img src="https://camo.githubusercontent.com/af054cc629b1cf9b06f836bf06c33d12546ff2d4e1d16df7055cb3d712ca1b08/68747470733a2f2f7765622e617263686976652e6f72672f7765622f323031393032313932323434303669665f2f687474703a2f2f626c6f67732e646973636f7665726d6167617a696e652e636f6d2f6e6f74726f636b6574736369656e63652f66696c65732f323031312f30372f526f636b706170657273636973736f72732e6a7067" alt="" data-canonical-src="https://web.archive.org/web/20190219224406if_/http://blogs.discovermagazine.com/notrocketscience/files/2011/07/Rockpaperscissors.jpg" height="200">

### Task

- A match is between 2 players. The first that wins 20 games of [Rock-Paper-Scissors](https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors) is the winner of the match and continues to the next round. The other player is eliminated from the tournament.

- If your bot wins 5 rounds, the final included, it has won the tournament.

- The number of opponents is limited. Each opponent has its own strategy that does not change.

- The tournament is played on the preloaded `RockPaperScissorsPlayground`:

```
RockPaperScissorsPlayground playground = new RockPaperScissorsPlayground();
boolean result = playground.playTournament(myPlayer);
```

This kata starts with a working bot, altough it plays with a poor random strategy. It can compete on the `RockPaperScissorsPlayground` because it implements:

```
interface RockPaperScissorsPlayer {
    // Your name as displayed in match results.
    String getName();
    
    // Used by playground to notify you that a new match will start.
    void setNewMatch(String opponentName);
    
    // Used by playground to get your game shape (values: "R", "P" or "S").
    String getShape();
    
    // Used by playground to inform you about the shape your opponent played in the game. 
    void setOpponentShape(String shape);
}
```

#### Note

The best way to solve this kata is:

- Extend methods `get shape` and `set opponent shape` to make the patterns of your opponents visible to you and analyse their strategies and weaknesses.

- If the strategy of an opponent is clear to you, adapt your bot to the opponent.

- Continue until your bot can beat all opponents by skill instead of sheer luck.

#algorithms #games #object-oriented-programming #design-patterns #design-principles #objects #classes #basic-language-features #fundamentals
