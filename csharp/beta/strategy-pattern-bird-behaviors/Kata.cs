using System;

public class QuackStrategy : IQuackBehavior {
  public string Quack() {
    return "Quack!";
  }
}

public class HonkStrategy : IQuackBehavior {
  public string Quack() {
    return "Honk!";
  }
}

public class SqueakStrategy : IQuackBehavior {
  public string Quack() {
    return "Squeak!";
  }
}

public class UncannyStrategy : IQuackBehavior {
  public string Quack() {
    return "Greetings human!";
  }
}

public class FlapStrategy : IFlyBehavior {
  public string Fly() {
    return "Flap!";
  }
}

public class RocketStrategy : IFlyBehavior {
  public string Fly() {
    return "Rocket boosters activated.\n" +
      "Ignition...\n" +
      "3...\n" +
      "2...\n" +
      "1...\n" +
      "Liftoff!";
  }
}

public class MallardDuck : Duck {
  public MallardDuck() :
    base(new QuackStrategy(), new FlapStrategy()) {}
}

public class Goose : Duck {
  public Goose() :
    base(new HonkStrategy(), new FlapStrategy()) {}
}

public class RubberDuck : Duck {
  public RubberDuck() :
    base(new SqueakStrategy(), null) {}
}

public class RocketDuck5000 : Duck {
  public RocketDuck5000() :
    base(new UncannyStrategy(), new RocketStrategy()) {}
}
