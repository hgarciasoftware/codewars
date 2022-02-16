using System;

public class GooseToIDuckAdapter : IDuck {
  private Goose goose;

  public GooseToIDuckAdapter(Goose goose) {
    this.goose = goose;
  }

  public string Quack() {
    return goose.Honk();
  }

  public void Fly() {
    goose.Fly();
  }
}
