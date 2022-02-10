function twoSum(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    const modifiedTarget = target - numbers[i];
    const subArray = numbers.slice(i + 1);
    const subIndex = subArray.indexOf(modifiedTarget);

    if (subIndex !== -1) return [i, subIndex + i + 1];
  }
}
