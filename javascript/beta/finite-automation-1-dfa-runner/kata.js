function runDFA(startState, transitions, acceptStates, input) {
  const currentState = startState;
  const currentChar = input[0];

  let nextState = null;

  for (let i = 0; i < transitions.length; i++) {
    if (transitions[i][0] === currentState && transitions[i][1] === currentChar) {
      nextState = transitions[i][2];
      break;
    }
  }

  if (nextState !== null) {
    return input.length > 1
      ? runDFA(nextState, transitions, acceptStates, input.slice(1), false)
      : acceptStates.includes(nextState);
  }

  return false;
}
