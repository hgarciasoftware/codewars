# Strategy Pattern - Bird Behaviors

https://www.codewars.com/kata/57964a1b39f33a2a450003c5

# Task

Given the concrete implementations of each duck on the right, redesign the classes and create new concrete behavior classes to fully take advantage of the Strategy Pattern and the Duck Class below. You can use null in place of a behavior that should return null.

### Duck Class

```
public abstract class Duck
{
    public IQuackBehavior QuackBehavior { get; protected set; }
    public IFlyBehavior FlyBehavior { get; protected set; }
    
    public Duck(IQuackBehavior, IFlyBehavior);
    public virtual string Quack();  // QuackBehavior.Quack()
    public virtual string Fly();    // FlyBehavior.Fly();
}
```

### IQuackBehavior Interface

```
public interface IQuackBehavior
{
    string Quack();
}
```

### IFlyBehavior Interface

```
public interface IFlyBehavior
{
    string Fly();
}
```

--------------------------------------------------

# Strategy Pattern

The __Strategy Pattern__ defines a particular family of algorithms or implementations, encapsulating each one, and making them interchangeable. This allows the algorithm to be dynamic and changed at runtime, swapping out functionality as needed and also making classes more flexible.

An initial approach may be to implement the behaviors as derived classes. The strategy pattern is explicit in encapsulating these behaviors as interfaces using composition instead of inheritance, which follows the [Open/Closed Principle](https://en.wikipedia.org/wiki/Strategy_pattern#Strategy_and_open.2Fclosed_principle).

Take for example a car class that requires different types of alarm, brake, and acceleration behaviors. If we were to use inheritance, we would run into several problems: behaviors must be declared in each new Car model; the work of managing these behaviors increases greatly as the number of models increases and has duplication; it is not easy to determine the exact nature of the behavior for each model without investigating the code in each.

![\`\`\` [ Car ] Alarm() Brake() Accelerate() ↑ ╔═══════════════════╬═══════════════════╗ [ Sedan ] [ Tesla ] [ Jalopy ] Alarm() Alarm() HandBrake() BrakeWithABS() BrakeWithABS() Clutch() Accelerate() InsaneMode()

\`\`\`](http://oi66.tinypic.com/2vsgk02.jpg)

We can improve the design and make it more flexible by interpreting each behavior (Acceleration, Brakes, and Alarm) as interfaces, which are encapsulated by the Car object. Then, concrete implementations of the Car class (Sedan, Tesla, and Jalopy) will each use a concrete implementation of a behavior (BrakesWithABS, HandBrake, InsaneMode, etc.) that fits its model:

![https://i.gyazo.com/fbed77a67cee3ec80e3ad6aa2e81cb94.png](https://i.gyazo.com/fbed77a67cee3ec80e3ad6aa2e81cb94.png)

### Strategy UML

![http://oi67.tinypic.com/2d2jhi0.jpg](http://oi67.tinypic.com/2d2jhi0.jpg)

1. __[Strategy]__ - Defines an interface that supports all common algorithms. The [Context] uses this interface to call the algorithm defined by a [ConcreteStrategy].

2. __[ConcreteStrategy]__ - Implements a specific algorithm using the [Strategy] interface.

3. __[Context]__ - Configured with a [ConcreteStrategy] object and maintans a reference to the [Strategy] object. May define an interface that lets [Strategy] access its data.

In the above example, each of the car models (_Tesla, Sedan, and Jalopy_) would be a __[Context]__, the different behaviors (_IBrakeBehavior, IAlarmBehavior, and IAccelBehavior_) would be the __[Strategy]__ modules, and each concrete implementation of those interfaces (_BrakeWithABS, Clutch, InsaneMode, etc._) would be a __[ConcreteStrategy]__.

### Uses

Use the Strategy pattern when:

- Classes differ only in their behavior, which can be configured with one of many different behaviors.

- A family of algorithms is needed for different use cases, such as efficiency or specific

- An algorithm uses data clients shouldn't know about. The Strategy pattern avoids exposing complex, algorithm-specific data structures.

- A class defines many behaviors as conditional statements in its operations. Move these behaviors to their own Strategy classes.

### Links

For more information on the Strategy Pattern, see:

- https://en.wikipedia.org/wiki/Strategy_pattern

- http://www.codeproject.com/Articles/776819/Strategy-Pattern-Csharp

- http://www.dofactory.com/net/strategy-design-pattern

#fundamentals #design-patterns #design-principles

### :neutral_face:
