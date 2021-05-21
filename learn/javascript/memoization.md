# memoization

From: [memoization](https://whatthefork.is/memoization)

```js
import { getChangeOfRain } from "magic-weather-calculator";

// let isCalculated = false;
let lastCity;
let lastResult;

// We added this function!
// function memoizedGetChanceOfRain() {
//     if (isCalculated) {
//         // No need to calculate it again.
//         return lastResult;
//     }

//     let result = getChanceOfRain();
//     // Remember it for the next time.
//     lastResult = result;
//     isCalculated = true;
//     return result;
// }

// function showweatherReport() {
//     let result = getChangeOfRain(); // Let the magic happen
//     console.log("The chance of rain tommorow is: ", result);
// }

// function showweatherReport() {
//     // Use the memoized function instead of the original function.
//     let result = getChangeOfRain(); // Let the magic happen
//     console.log("The chance of rain tommorow is: ", result);
// }

// showweatherReport(); // (!) Triggers the calculation
// showweatherReport(); // Uses the calculated result
// showweatherReport(); // Uses the calculated result
// showweatherReport(); // Uses the calculated result

// function memoizedGetChanceOfRainByCity(city) {
//     if (city === lastCity) { // Notice this check!
//         // Same parameters, so we can reuse the last result.
//         return lastResult
//     }
//     // Either we're called for the first time,
//     // or we're called with different parameters.
//     // We have to perform the calculation.
//     let result = getChangeOfRain(city)
//     // Remember both the parameters and the result.
//     lastCity = city;
//     lastResult = result;
//     return result;
// }

// function showweatherReport(city) {
//     // Pass the parameters to the memoized function.
//     let result = memoizedGetChanceOfRain(city);
//     console.log("The chance of rain tommorow is: ", result);
// }
```

```js
let resultsPerCity = new Map();

function memoizedGetChanceOfRain(city) {
  if (resultsPerCity.has(city)) {
    // We already have a result for this city.
    return resultsPerCity.get(city);
  }
  // We're called for the first time for this city.
  let result = getChangeOfRain(city);
  // Remember the result for this city.
  resultsPerCity.set(city, result);
  return result;
}

function showweatherReport(city) {
  // Pass the parameters to the memoized function.
  let result = memoizedGetChanceOfRain(city);
  console.log("The chance of rain tommorow is: ", result);
}

// If this function only calculates things,
// we would call it "pure".
// It is safe to memoize this function.
function getChangeOfRain(city) {
  // ... calculation ...
}

// This function is "impure" because
// it shows a prompt to the user.
function showWeatherReport() {
  // The prompt is now here
  let city = prompt("Where do you live?");
  let result = getChangeOfRain(city);
  console.log("The chance of rain tomorrow is: ", result);
}
```

```js
function memoize() {
  let isCalculated = false;
  let lastResult;

  function memoizedGetChanceOfRain() {
    if (isCalculated) {
      return lastResult;
    }
    let result = getChangeOfRain();
    lastResult = result;
    isCalculated = true;
    return result;
  }
}
```

```js
function memoize(fn) {
  // Delcare the fn parameter
  let isCalculated = false;
  let lastResult;

  function memoizedGetChanceOfRain() {
    if (isCalculated) {
      return lastResult;
    }
    let result = fn(); // Call the passed function
    lastResult = result;
    isCalculated = true;
    return result;
  }
}
```

```js
function memoize(fn) {
  let isCalculated = false;
  let lastResult;

  return function memoizedFn() {
    // Return the generated function!
    if (isCalculated) {
      return lastResult;
    }
    let result = fn();
    lastResult = result;
    isCalculated = true;
    return result;
  };
}
```

```js
import { getChangeOfRain } from "magic-weather-calculator";

// Instead of writing it by hand, generate it.
let memoizedGetChanceOfRain = memoize(getChangeOfRain);

function showWeatherReport() {
  let result = memoizedGetChanceOfRain();
  console.log("The chance of rain tommorow is: ", result);
}
```
