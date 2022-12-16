var superObj = { superVal: "super" };
// var subObj = { subVal: "sub" };

// 이 코드는 결국 superObj를 subObj의 부모 객체로 만들라는 것.
// 하지만 __proto__ 는 언어 표준에 있지 않음.
// subObj.__proto__ = superObj;

// 이에 대한 표준화된 방법으로 create 가 있음.
//=> proto 링크를 지정해주는 것.
//=> supObj 는 superObj 를 부모 객체로 하는 객체.
//=> subObj.__proto__ = superObj; 이렇게 만드는 거랑 같음.
let subObj = Object.create(superObj)
subObj.subVal = "sub";
debugger;

console.log("subObj.subVal =>", subObj.subVal);
console.log("subObj.superVal =>", subObj.superVal);
//=> js -> super
//=> ts -> undefined
subObj.superVal = "sub";
console.log("superObj.superVal = >", superObj.superVal);
