async function func1() {
  const promise = asyncOperation();
  return await promise;
}

async function func2() {
  const promise = asyncOperation();
  return promise;
}

function promisedDivision(n1, n2) {
  if (n2 === 0) {
    return Promise.reject(new Error("Cannot divide by 0"));
  } else {
    return Promise.resolve(n1 / n2);
  }
}

async function divideWithAwait() {
  try {
    return await promisedDivision(6, 0);
  } catch (error) {
    console.log("error");
  }
}

async function divideWithoutAwait() {
  try {
    return promisedDivision(6, 0);
  } catch (error) {
    console.log("error");
  }
}

async function run() {
  const result = await divideWithoutAwait();
  console.log(result);
}
run();
