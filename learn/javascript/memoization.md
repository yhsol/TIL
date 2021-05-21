# memoization

From: [memoization](https://whatthefork.is/memoization)

'메묘이제이션은 성능을 향상시켜준다' 정도로 이해하고 있었지, 자세한 작동 방법에 대해서는 생각해 보지 않았다.
글에서 메모이제이션이 필요한 이유와 그 필요를 충족하기 위한 로직의 구현, 구현 이유와 생각해 볼 점 등을 친절하게 알려준다.
메모이제이션을 하는 이유는 하지 않아도 되는 계산을 하지 않기 위함이다. 계산의 낭비를 막는 것.
글에서 날씨를 예로 사용하는데 오늘 날씨가 어떻지? 라고 했을 때 날씨를 확인하고 나면 뭔가 변경사항이 없다면 다시 확인할 필요는 없기 때문에
다시 확인하는 자원을 아낀다는 의미이다.
실제 개발을 하거나 알고리즘을 구현할 때도 특정 계산을 건너뛰거나 가지고 있는 데이터를 활용하는 경우가 많은데 그와도 비슷한 맥락이 있다고 생각했다.
메모이제이션 기능을 수행하는 함수는 기본적으로 계산하려는 값이 전에 계산된 것과 같은 조건인지, 계산이 됐었는지, 계산된 데이터가 있는지 확인해서  
 같은 조건으로 계산된 결괏값이 있다면 다시 계산하지 않고 이전에 계산했던 값을 사용하도록 한다.

메모이제이션 함수를 재사용하기 위해서는 메모이제이션 기능만을 따로 독립적으로 수행할 수 있도록 순수 함수로 구현한다.
외부요인에 영향을 받지 않고 파라미터로 전달된 값만으로 판단하여 동작하도록 한다.
그럼으로써 함수의 동작과 결괏값을 신뢰할 수 있고, 파라미터만을 변경해가며 함수를 재사용할 수 있다.

메모이제이션 기능은 구현할 수도 있지만 lodash 등에 구현체가 있으므로 활용하는 것도 좋을 듯하다.
하지만 메모이제이션을 사용할 때는 신중해야 하며 뚜렷한 성능 향상을 가져오는 경우에 사용하도록 권장하고 있다.
그렇지 않을 경우 복잡성과 잠재적 버그의 요인이 될 수 있다고 한다.

메모이제이션에 대한 내용도 좋았지만 그걸 자세히 풀어주니 글을 읽으면서 딱 메모이제이션을 사용하지 않더라도  
 메모이제이션의 컨셉을 활용한 로직들을 만들어보면 좋겠다는 생각을 했다.

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
