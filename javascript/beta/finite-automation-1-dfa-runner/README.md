# Finite automation 1: DFA Runner

https://www.codewars.com/kata/6168ca0bc9bd9b00347cb26f

# What is DFA

[DFA (Deterministic Finite State Machine)](https://en.wikipedia.org/wiki/Deterministic_finite_automaton) is a mathematical model that contains:

- Set of states `Q`

- Set of transitions `transitions`

- Starting state of `startState` from `Q`

- The set of accepted states `acceptStates`, a subset of Q

Each transition consists of two states (s1, s2) and a symbol (a): `s1 -a-> s2`

There can be only one transition for each `s1` and `a`.

DFA can accept some character sequences or not.

When the string is received:

1. Current state become `startState`

2. Read next character of `input`

3. If in `transitions` no element of the form `[current state, current character, next state]`, then `input` is not accepted

4. Current state become next state from trinsition

5. If `input` are over and current state from `acceptStates`, then `input` is accepted, else go to (3)

# Task

Write a function that takes:

- Start state (number)

- Transitions (array of [number, symbol, number])

- Accepted states (array of numbers)

- Input (string)

Return `true` if this input is accepted, and `false` if not.

If there are no transition for the current state and next character, return `false`.

## Example

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.stack.imgur.com%2FTwVxh.png&f=1&nofb=1)

Each state will coresponding with number:

```
 0 for q0
 1 for q1
 2 for q2
```

```
startState = 0  
trinsitions = [  
   [0, '0', 1], // q0 -0-> q1    
   [0, '1', 2], // q1 -1-> q2    
   [1, '0', 0], // q1 -0-> q0    
   [1, '1', 2], // q1 -1-> q2  
   [2, '0', 2], // q2 -0-> q2    
   [2, '1', 2], // q2 -1-> q2
]
acceptStates = [2] 
```

This DFA accepts "0011" and does not accept "000".

Succession of states for the `input` "0011", starting in `startState`:

- q0 -0-> q1

- q1 -0-> q0

- q0 -1-> q2

- q2 -1-> q2

When characters are over, DFA is in state q2 which is accepted.

Succession of states for the `input` "000", starting in `startState`:

- q0 -0-> q1

- q1 -0-> q0

- q0 -0-> q1

When characters are over, DFA is in state q1 which is not accepted.

# More

- Finite automation 1: DFA Runner

- [Finite automation 2: NFA Runner](https://www.codewars.com/kata/6168a55ac9bd9b003e799673)

- [Finite automation 3: Convert NFA to DFA](https://www.codewars.com/kata/616beb11ccceda002c421dec)
