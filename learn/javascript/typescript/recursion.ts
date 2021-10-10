// For Loop
function sumResultForLoop(num: number) {
  let result = 0;

  for (let i = num; i >= 1; i -= 1) {
    result += i;
  }

  return result;
}

// Recursion

/**
 * pseudocode
 * function sumResult(num: string) {
 *  return num 까지 모두 더한 결과
 * }
 */

function sumResultRecursion(num: number): number {
  // 종료 조건: 0 은 더해지면 안됨
  if (num == 1) {
    return 1;
  }

  // num + 지금까지 더한 값
  return num + sumResultRecursion(num - 1);
}

console.log(sumResultRecursion(100));
