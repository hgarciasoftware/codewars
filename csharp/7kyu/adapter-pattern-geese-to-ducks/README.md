# Adapter Pattern - Geese to Ducks

https://www.codewars.com/kata/5792e2e93467db66a000009f

# Task

Given an interface `IDuck`, you are to create an Object Adapter (using Composition) in order to adapt the `Goose` class to support the `IDuck` interface.

### IDuck Interface

```
public interface IDuck
{
    string Quack();
    void Fly();
}
```

### Goose Class

```
public class Goose
{
    string Honk();
    void Fly();
}
```

--------------------------------------------------

# Adapter Pattern

The adapter pattern converts the interface of one class into the interface of another that the client expects. Adapters allow one class to work in an instance where it otherwise couldn't because of incompatible interfaces.

The adapter structure uses either composition (object adapters) or inheritance (class adapters, used in languages that support multiple inheritance) to provide the expected interface that the client relies on. The participants of the pattern involve the following:

1. __[Target]__ - Defines the domain-specific interface that the [Client] will use.

2. __[Client]__ - Collaborates with the objects conforming to the [Target] interface.

3. __[Adaptee]__ - Defines an existing interface that needs adapting.

4. __[Adapter]__ - Adapts the interface of the [Adaptee] to the [Target] interface.

### Adapter UML

![\`\`\` [ Client ] ═══► [ Target ] [ Adaptee ] Request() SepcificRequest() ▲ ▲ ╚═════ [ Adapter ] ═════════════╝ Request() adaptee | └-----------------------► adaptee->SpecificRequest()

\`\`\`](http://oi66.tinypic.com/2ajb70g.jpg)

For more information on the Adapter Pattern, see:

- https://en.wikipedia.org/wiki/Adapter_pattern

- https://dotnetcodr.com/2013/04/25/design-patterns-and-practices-in-net-the-adapter-pattern/

- http://www.dofactory.com/net/adapter-design-pattern

#fundamentals #design-patterns #design-principles
